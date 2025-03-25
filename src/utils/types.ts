
export interface PaymentMethod {
  id: string;
  user_id: string;
  name: string;
  type: 'bank' | 'wallet' | 'exchange';
  balance: number;
  currency: string;
  description?: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  type: 'buy' | 'sell';
  amount: number;
  local_amount: number;
  rate: number;
  fee: number;
  profit: number;
  source_method_id: string;
  destination_method_id: string;
  date: string;
  platform: string;
  description?: string;
}

export interface Goal {
  id: string;
  user_id: string;
  payment_method_id: string;
  target_volume: number;
  current_volume: number;
  start_date: string;
  end_date?: string;
  completed: boolean;
  description?: string;
}

export interface Stat {
  id: string;
  user_id: string;
  date: string;
  total_profit: number;
  transaction_count: number;
  volume: number;
  time_frame: 'day' | 'week' | 'month' | 'year';
}

export interface PaymentMethodStat {
  id: string;
  stat_id: string;
  payment_method_id: string;
  profit: number;
  volume: number;
  transaction_count: number;
}

export interface UserProfile {
  id: string;
  user_id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  language?: string;
  currency?: string;
  theme?: 'light' | 'dark';
}
