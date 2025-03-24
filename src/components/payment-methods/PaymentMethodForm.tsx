
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { paymentMethods } from "@/utils/dummy-data";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const PaymentMethodForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  // Find the payment method if editing
  const paymentMethod = isEditing 
    ? paymentMethods.find(pm => pm.id === id) 
    : null;
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would save the data to the backend here
    toast.success(
      isEditing 
        ? "Payment method updated successfully!" 
        : "Payment method added successfully!"
    );
    
    navigate("/payment-methods");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/payment-methods")}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditing ? "Edit Payment Method" : "Add Payment Method"}
        </h1>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Details" : "Enter Details"}</CardTitle>
            <CardDescription>
              {isEditing 
                ? "Update your payment method information" 
                : "Add a new bank, digital wallet, or exchange"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="e.g. Banco de Venezuela, Zinli, Binance" 
                defaultValue={paymentMethod?.name || ""}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select defaultValue={paymentMethod?.type || "bank"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">Bank</SelectItem>
                  <SelectItem value="wallet">Digital Wallet</SelectItem>
                  <SelectItem value="exchange">Exchange</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="balance">Balance</Label>
                <Input 
                  id="balance" 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  placeholder="Current balance" 
                  defaultValue={paymentMethod?.balance || "0"}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select defaultValue={paymentMethod?.currency || "USD"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="VES">VES</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea 
                id="description" 
                placeholder="Add notes about this payment method" 
                defaultValue={paymentMethod?.description || ""}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => navigate("/payment-methods")}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update Payment Method" : "Add Payment Method"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default PaymentMethodForm;
