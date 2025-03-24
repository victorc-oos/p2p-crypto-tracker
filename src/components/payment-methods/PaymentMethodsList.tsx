
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart2,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
  Wallet,
} from "lucide-react";
import { paymentMethods, transactions } from "@/utils/dummy-data";
import { PaymentMethod } from "@/utils/types";
import { toast } from "sonner";

const PaymentMethodsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filter payment methods based on search term
  const filteredMethods = paymentMethods.filter(
    (method) =>
      method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      method.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      method.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get statistics for each payment method
  const getMethodStats = (methodId: string) => {
    const methodTransactions = transactions.filter(
      (t) => t.sourceMethodId === methodId || t.destinationMethodId === methodId
    );

    const totalVolume = methodTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalProfit = methodTransactions.reduce((sum, t) => sum + t.profit, 0);

    return {
      transactionCount: methodTransactions.length,
      volume: totalVolume,
      profit: totalProfit,
    };
  };

  // Get type badge color
  const getTypeColor = (type: PaymentMethod["type"]) => {
    switch (type) {
      case "bank":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "wallet":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "exchange":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Delete a payment method (mock)
  const handleDelete = (id: string) => {
    toast.success("Payment method deleted successfully!");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Methods</h1>
          <p className="text-muted-foreground">
            Manage your banks, wallets, and exchanges
          </p>
        </div>
        <Button onClick={() => navigate("/payment-methods/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add Payment Method
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <CardTitle>All Payment Methods</CardTitle>
              <CardDescription>
                You have {paymentMethods.length} payment methods configured
              </CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search payment methods..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMethods.map((method) => {
                const stats = getMethodStats(method.id);
                return (
                  <TableRow key={method.id}>
                    <TableCell className="font-medium">{method.name}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                          method.type
                        )}`}
                      >
                        {method.type}
                      </span>
                    </TableCell>
                    <TableCell>{method.balance.toFixed(2)}</TableCell>
                    <TableCell>{method.currency}</TableCell>
                    <TableCell>{stats.volume.toFixed(2)} USDT</TableCell>
                    <TableCell>
                      <span
                        className={
                          stats.profit >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }
                      >
                        {stats.profit >= 0 ? "+" : ""}
                        {stats.profit.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => navigate(`/payment-methods/${method.id}`)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => navigate(`/payment-methods/${method.id}/stats`)}
                          >
                            <BarChart2 className="mr-2 h-4 w-4" />
                            <span>View Stats</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(method.id)}
                            className="text-red-600 dark:text-red-400"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Banks */}
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Banks</CardTitle>
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              <Wallet className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {paymentMethods.filter((pm) => pm.type === 'bank').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Total:{' '}
              {paymentMethods
                .filter((pm) => pm.type === 'bank')
                .reduce((sum, pm) => sum + pm.balance, 0)
                .toFixed(2)}
            </p>
          </CardContent>
        </Card>

        {/* Wallets */}
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Digital Wallets</CardTitle>
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
              <Wallet className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {paymentMethods.filter((pm) => pm.type === 'wallet').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Total:{' '}
              {paymentMethods
                .filter((pm) => pm.type === 'wallet')
                .reduce((sum, pm) => sum + pm.balance, 0)
                .toFixed(2)}
            </p>
          </CardContent>
        </Card>

        {/* Exchanges */}
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exchanges</CardTitle>
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
              <Wallet className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {paymentMethods.filter((pm) => pm.type === 'exchange').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Total:{' '}
              {paymentMethods
                .filter((pm) => pm.type === 'exchange')
                .reduce((sum, pm) => sum + pm.balance, 0)
                .toFixed(2)}{' '}
              USDT
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentMethodsList;
