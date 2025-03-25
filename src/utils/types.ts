
export type PaymentMethodType = 'bank' | 'wallet' | 'exchange';

export interface PaymentMethod {
  id: string;
  user_id: string;
  name: string;
  type: PaymentMethodType;
  balance: number;
  currency: string;
  description?: string;
  created_at: Date;
}

export type TransactionType = 'buy' | 'sell';

export interface Transaction {
  id: string;
  user_id: string;
  type: TransactionType;
  amount: number; // USDT amount
  local_amount: number; // Local currency amount
  rate: number; // Exchange rate
  fee: number; // Fee percentage
  profit: number; // Profit amount (can be negative for loss)
  source_method_id: string; // Source payment method ID
  destination_method_id: string; // Destination payment method ID
  date: Date;
  platform: string; // Platform where the transaction was made
  description?: string;
}

export interface Goal {
  id: string;
  user_id: string;
  payment_method_id: string;
  target_volume: number;
  current_volume: number;
  start_date: Date;
  end_date?: Date;
  completed: boolean;
  description?: string;
}

export interface Stat {
  id: string;
  user_id: string;
  date: Date;
  total_profit: number;
  transaction_count: number;
  volume: number;
  time_frame: TimeFrame;
}

export interface PaymentMethodStat {
  id: string;
  stat_id: string;
  payment_method_id: string;
  profit: number;
  volume: number;
  transaction_count: number;
}

export type TimeFrame = 'day' | 'week' | 'month' | 'year';

export interface User {
  id: string;
  email: string;
  prefersDarkMode?: boolean;
}
