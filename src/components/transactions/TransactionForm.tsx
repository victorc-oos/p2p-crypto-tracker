
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { paymentMethods, transactions } from "@/utils/dummy-data";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const TransactionForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Find the transaction if editing
  const transaction = isEditing
    ? transactions.find((t) => t.id === id)
    : null;

  // State for form calculations
  const [transactionType, setTransactionType] = useState<"buy" | "sell">(
    transaction?.type || "buy"
  );
  const [amount, setAmount] = useState(transaction?.amount || 0);
  const [rate, setRate] = useState(transaction?.rate || 0);
  const [fee, setFee] = useState(transaction?.fee || 0);

  // Calculate local amount and profit
  const localAmount = amount * rate;
  const feeAmount = (amount * fee) / 100;
  const profit =
    transactionType === "buy"
      ? -(feeAmount * rate) // Loss from fees when buying
      : (amount * 0.01 * rate) - (feeAmount * rate); // 1% profit minus fees when selling

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would save the data to the backend here
    toast.success(
      isEditing
        ? "Transaction updated successfully!"
        : "Transaction added successfully!"
    );

    navigate("/transactions");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/transactions")}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditing ? "Edit Transaction" : "New Transaction"}
        </h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Details" : "Enter Details"}</CardTitle>
            <CardDescription>
              {isEditing
                ? "Update your transaction information"
                : "Record a new USDT buy or sell transaction"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="type">Transaction Type</Label>
              <Select
                defaultValue={transaction?.type || "buy"}
                onValueChange={(value: "buy" | "sell") => setTransactionType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy USDT</SelectItem>
                  <SelectItem value="sell">Sell USDT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">USDT Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Amount of USDT"
                  defaultValue={transaction?.amount || "0"}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">Exchange Rate</Label>
                <Input
                  id="rate"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Rate per USDT"
                  defaultValue={transaction?.rate || "0"}
                  onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="localAmount">Local Amount</Label>
                <Input
                  id="localAmount"
                  type="number"
                  value={localAmount.toFixed(2)}
                  readOnly
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fee">Fee (%)</Label>
                <Input
                  id="fee"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Transaction fee"
                  defaultValue={transaction?.fee || "0"}
                  onChange={(e) => setFee(parseFloat(e.target.value) || 0)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sourceMethod">From</Label>
                <Select defaultValue={transaction?.sourceMethodId || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        {method.name} ({method.currency})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destinationMethod">To</Label>
                <Select defaultValue={transaction?.destinationMethodId || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        {method.name} ({method.currency})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Input
                id="platform"
                placeholder="e.g. Binance P2P, LocalBitcoins"
                defaultValue={transaction?.platform || ""}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  defaultValue={
                    transaction
                      ? new Date(transaction.date).toISOString().split("T")[0]
                      : new Date().toISOString().split("T")[0]
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profit">Profit/Loss</Label>
                <Input
                  id="profit"
                  type="number"
                  value={profit.toFixed(2)}
                  readOnly
                  className={`bg-muted ${
                    profit >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add notes, transaction ID, or user information"
                defaultValue={transaction?.description || ""}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate("/transactions")}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update Transaction" : "Add Transaction"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default TransactionForm;
