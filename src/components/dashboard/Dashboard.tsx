
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { paymentMethods, transactions, stats } from "@/utils/dummy-data";
import { ArrowRight, BarChart as BarChartIcon, Plus, Target, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<'day' | 'week' | 'month'>('week');
  const navigate = useNavigate();
  
  // Calculate total balances
  const totalUSDT = paymentMethods
    .filter(pm => pm.currency === 'USDT')
    .reduce((sum, pm) => sum + pm.balance, 0);
    
  const totalLocalCurrency = paymentMethods
    .filter(pm => pm.currency !== 'USDT')
    .reduce((sum, pm) => sum + pm.balance, 0);
  
  // Calculate recent stats
  const recentStats = stats.slice(0, timeFrame === 'day' ? 7 : timeFrame === 'week' ? 4 : 30).reverse();
  
  // Format date for chart
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(new Date(date));
  };
  
  // Process chart data
  const profitChartData = recentStats.map(stat => ({
    date: formatDate(stat.date),
    profit: stat.totalProfit.toFixed(2),
  }));
  
  // Get most profitable payment methods
  const methodPerformance = paymentMethods.map(method => {
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
  
  // Recent transactions
  const recentTransactions = transactions.slice(0, 5);
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Your P2P crypto trading performance at a glance
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => navigate('/payment-methods/new')}>
            <Plus className="mr-2 h-4 w-4" /> Add Payment Method
          </Button>
          <Button onClick={() => navigate('/transactions/new')} variant="outline">
            <Plus className="mr-2 h-4 w-4" /> New Transaction
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total USDT
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUSDT.toFixed(2)} USDT</div>
            <p className="text-xs text-muted-foreground">
              Across {paymentMethods.filter(pm => pm.currency === 'USDT').length} platforms
            </p>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Local Currency
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalLocalCurrency.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              In {paymentMethods.filter(pm => pm.currency !== 'USDT').length} payment methods
            </p>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Profit (30d)
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${recentStats.reduce((sum, stat) => sum + stat.totalProfit, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              From {recentStats.reduce((sum, stat) => sum + stat.transactionCount, 0)} transactions
            </p>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Volume (30d)
            </CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recentStats.reduce((sum, stat) => sum + stat.volume, 0).toFixed(2)} USDT
            </div>
            <p className="text-xs text-muted-foreground">
              Volume across all payment methods
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Profit & Loss</CardTitle>
            <CardDescription>
              Your trading profit over time
            </CardDescription>
            <Tabs defaultValue="week" className="w-full">
              <TabsList className="grid w-full max-w-xs grid-cols-3">
                <TabsTrigger value="day" onClick={() => setTimeFrame('day')}>Day</TabsTrigger>
                <TabsTrigger value="week" onClick={() => setTimeFrame('week')}>Week</TabsTrigger>
                <TabsTrigger value="month" onClick={() => setTimeFrame('month')}>Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profitChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Profit']}
                  labelFormatter={(value) => `Date: ${value}`}
                />
                <Line type="monotone" dataKey="profit" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Payment Methods Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Payment Methods</CardTitle>
            <CardDescription>
              Your most profitable payment methods
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={methodPerformance.slice(0, 5)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Profit']}
                  labelFormatter={(value) => `Method: ${value}`}
                />
                <Legend />
                <Bar dataKey="profit" fill="hsl(var(--primary))" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your last 5 transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map(transaction => {
                const sourceMethod = paymentMethods.find(pm => pm.id === transaction.sourceMethodId);
                const destMethod = paymentMethods.find(pm => pm.id === transaction.destinationMethodId);
                
                return (
                  <div key={transaction.id} className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'buy' 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                    }`}>
                      {transaction.type === 'buy' ? 'Buy' : 'Sell'}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {transaction.amount} USDT @ {transaction.rate.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {sourceMethod?.name} <ArrowRight className="inline h-3 w-3" /> {destMethod?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        transaction.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {transaction.profit >= 0 ? '+' : ''}{transaction.profit.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
              
              <Button variant="ghost" className="w-full" onClick={() => navigate('/transactions')}>
                View All Transactions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
