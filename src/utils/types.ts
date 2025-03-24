
export type PaymentMethodType = 'bank' | 'wallet' | 'exchange';

export interface PaymentMethod {
  id: string;
  name: string;
  type: PaymentMethodType;
  balance: number;
  currency: string;
  description?: string;
  createdAt: Date;
}

export type TransactionType = 'buy' | 'sell';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number; // USDT amount
  localAmount: number; // Local currency amount
  rate: number; // Exchange rate
  fee: number; // Fee percentage
  profit: number; // Profit amount (can be negative for loss)
  sourceMethodId: string; // Source payment method ID
  destinationMethodId: string; // Destination payment method ID
  date: Date;
  platform: string; // Platform where the transaction was made
  description?: string;
}

export interface Goal {
  id: string;
  paymentMethodId: string;
  targetVolume: number;
  currentVolume: number;
  startDate: Date;
  endDate?: Date;
  completed: boolean;
  description?: string;
}

export interface Stat {
  date: Date;
  totalProfit: number;
  transactionCount: number;
  volume: number;
  paymentMethodStats: PaymentMethodStat[];
}

export interface PaymentMethodStat {
  paymentMethodId: string;
  profit: number;
  volume: number;
  transactionCount: number;
}

export type TimeFrame = 'day' | 'week' | 'month' | 'year';

export interface User {
  id: string;
  name: string;
  email: string;
  prefersDarkMode: boolean;
}
