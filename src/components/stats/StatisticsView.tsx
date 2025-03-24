
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { stats, paymentMethods, transactions } from "@/utils/dummy-data";
import { PaymentMethodType, TimeFrame } from "@/utils/types";

const StatisticsView: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("week");
  const [methodType, setMethodType] = useState<PaymentMethodType | "all">("all");
  
  // Prepare data for time-based charts
  const getTimeFrameData = () => {
    let filteredStats = stats;
    let count = timeFrame === "day" ? 7 : timeFrame === "week" ? 4 : 30;
    
    return filteredStats.slice(0, count).reverse();
  };
  
  // Format data for profit chart
  const profitChartData = getTimeFrameData().map(stat => ({
    date: new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(new Date(stat.date)),
    profit: stat.totalProfit.toFixed(2),
    volume: stat.volume.toFixed(2),
  }));
  
  // Format data for payment method performance
  const getPaymentMethodPerformance = () => {
    const methodPerformance = paymentMethods
      .filter(m => methodType === "all" || m.type === methodType)
      .map(method => {
        const methodTransactions = transactions.filter(t => 
          t.sourceMethodId === method.id || t.destinationMethodId === method.id
        );
        
        const totalProfit = methodTransactions.reduce((sum, t) => sum + t.profit, 0);
        const totalVolume = methodTransactions.reduce((sum, t) => sum + t.amount, 0);
        
        return {
          id: method.id,
          name: method.name,
          type: method.type,
          profit: totalProfit,
          volume: totalVolume,
          transactionCount: methodTransactions.length,
        };
      }).sort((a, b) => b.profit - a.profit);
      
    return methodPerformance;
  };
  
  // Prepare data for pie chart
  const pieChartData = getPaymentMethodPerformance().map(item => ({
    name: item.name,
    value: Math.abs(item.profit), // Using absolute value for better visualization
    actualProfit: item.profit,
  }));
  
  // Colors for pie chart
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
    '#82CA9D', '#F44336', '#3F51B5', '#E91E63', '#9C27B0'
  ];
  
  // Calculate total stats
  const totalProfit = stats.reduce((sum, stat) => sum + stat.totalProfit, 0);
  const totalVolume = stats.reduce((sum, stat) => sum + stat.volume, 0);
  const totalTransactions = stats.reduce((sum, stat) => sum + stat.transactionCount, 0);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
        <p className="text-muted-foreground">
          Analyze your trading performance over time
        </p>
      </div>
      
      {/* Time Frame Selection */}
      <Tabs defaultValue="week" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="day" onClick={() => setTimeFrame("day")}>Daily</TabsTrigger>
          <TabsTrigger value="week" onClick={() => setTimeFrame("week")}>Weekly</TabsTrigger>
          <TabsTrigger value="month" onClick={() => setTimeFrame("month")}>Monthly</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              totalProfit >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}>
              {totalProfit >= 0 ? "+" : ""}{totalProfit.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              From all recorded transactions
            </p>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalVolume.toFixed(2)} USDT
            </div>
            <p className="text-xs text-muted-foreground">
              Total traded USDT
            </p>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalTransactions}
            </div>
            <p className="text-xs text-muted-foreground">
              Total number of transactions
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Profit & Volume Over Time</CardTitle>
            <CardDescription>
              Your trading profit and volume over the selected time frame
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profitChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    `${name === 'profit' ? '$' : ''}${value}${name === 'volume' ? ' USDT' : ''}`, 
                    name === 'profit' ? 'Profit' : 'Volume'
                  ]}
                  labelFormatter={(value) => `Date: ${value}`}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="profit" 
                  stroke="hsl(var(--primary))" 
                  name="Profit"
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#82ca9d" 
                  name="Volume (USDT)"
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Method Performance</CardTitle>
            <CardDescription>
              Profit by payment method
            </CardDescription>
            <Tabs defaultValue="all" className="w-full mt-2">
              <TabsList className="grid w-full max-w-md grid-cols-4">
                <TabsTrigger value="all" onClick={() => setMethodType("all")}>All</TabsTrigger>
                <TabsTrigger value="bank" onClick={() => setMethodType("bank")}>Banks</TabsTrigger>
                <TabsTrigger value="wallet" onClick={() => setMethodType("wallet")}>Wallets</TabsTrigger>
                <TabsTrigger value="exchange" onClick={() => setMethodType("exchange")}>Exchanges</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={getPaymentMethodPerformance().slice(0, 6)} 
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip 
                  formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Profit']}
                  labelFormatter={(value) => `Method: ${value}`}
                />
                <Legend />
                <Bar dataKey="profit" fill="hsl(var(--primary))" name="Profit">
                  {getPaymentMethodPerformance().slice(0, 6).map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.profit >= 0 ? '#4ade80' : '#f87171'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Profit Distribution</CardTitle>
            <CardDescription>
              Proportion of profit by payment method
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [`$${props.payload.actualProfit.toFixed(2)}`, props.payload.name]}
                  labelFormatter={() => 'Profit'}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsView;
