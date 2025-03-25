
import { PaymentMethod, Transaction, Goal, Stat, PaymentMethodStat } from './types';

// Métodos de pago de ejemplo
export const paymentMethods: PaymentMethod[] = [
  {
    id: "pm1",
    user_id: "user1",
    name: "Banco Principal",
    type: "bank",
    balance: 5000,
    currency: "USD",
    description: "Cuenta principal para operaciones diarias",
    created_at: "2023-01-01T00:00:00Z"
  },
  {
    id: "pm2",
    user_id: "user1",
    name: "Binance",
    type: "exchange",
    balance: 2500,
    currency: "USDT",
    description: "Exchange principal para criptomonedas",
    created_at: "2023-01-15T00:00:00Z"
  },
  {
    id: "pm3",
    user_id: "user1",
    name: "Metamask",
    type: "wallet",
    balance: 1200,
    currency: "ETH",
    description: "Wallet para Ethereum y tokens ERC-20",
    created_at: "2023-02-01T00:00:00Z"
  },
  {
    id: "pm4",
    user_id: "user1",
    name: "Coinbase",
    type: "exchange",
    balance: 3000,
    currency: "USDT",
    description: "Exchange secundario para operaciones en USD",
    created_at: "2023-02-15T00:00:00Z"
  },
  {
    id: "pm5",
    user_id: "user1",
    name: "Banco Secundario",
    type: "bank",
    balance: 2000,
    currency: "EUR",
    description: "Cuenta en euros para gastos internacionales",
    created_at: "2023-03-01T00:00:00Z"
  }
];

// Transacciones de ejemplo
export const transactions: Transaction[] = [
  {
    id: "t1",
    user_id: "user1",
    type: "buy",
    amount: 500,
    local_amount: 490,
    rate: 0.98,
    fee: 2.5,
    profit: 10,
    source_method_id: "pm1",
    destination_method_id: "pm2",
    date: "2023-03-10T10:30:00Z",
    platform: "Binance P2P",
    description: "Compra de USDT con transferencia bancaria"
  },
  {
    id: "t2",
    user_id: "user1",
    type: "sell",
    amount: 1000,
    local_amount: 980,
    rate: 0.98,
    fee: 5,
    profit: 20,
    source_method_id: "pm2",
    destination_method_id: "pm1",
    date: "2023-03-15T14:45:00Z",
    platform: "Binance P2P",
    description: "Venta de USDT con transferencia bancaria"
  },
  {
    id: "t3",
    user_id: "user1",
    type: "buy",
    amount: 300,
    local_amount: 294,
    rate: 0.98,
    fee: 1.5,
    profit: 6,
    source_method_id: "pm1",
    destination_method_id: "pm3",
    date: "2023-03-20T09:15:00Z",
    platform: "Uniswap",
    description: "Compra de ETH con tarjeta de crédito"
  },
  {
    id: "t4",
    user_id: "user1",
    type: "sell",
    amount: 600,
    local_amount: 588,
    rate: 0.98,
    fee: 3,
    profit: 12,
    source_method_id: "pm3",
    destination_method_id: "pm1",
    date: "2023-03-25T16:00:00Z",
    platform: "Coinbase",
    description: "Venta de ETH con transferencia bancaria"
  },
  {
    id: "t5",
    user_id: "user1",
    type: "buy",
    amount: 800,
    local_amount: 784,
    rate: 0.98,
    fee: 4,
    profit: 16,
    source_method_id: "pm1",
    destination_method_id: "pm4",
    date: "2023-03-30T12:30:00Z",
    platform: "Coinbase",
    description: "Compra de BTC con tarjeta de crédito"
  }
];

// Metas de ejemplo
export const goals: Goal[] = [
  {
    id: "g1",
    user_id: "user1",
    payment_method_id: "pm2",
    target_volume: 5000,
    current_volume: 2500,
    start_date: "2023-01-01T00:00:00Z",
    end_date: "2023-12-31T23:59:59Z",
    completed: false,
    description: "Meta anual de volumen en Binance"
  },
  {
    id: "g2",
    user_id: "user1",
    payment_method_id: "pm3",
    target_volume: 2000,
    current_volume: 1200,
    start_date: "2023-01-01T00:00:00Z",
    end_date: "2023-06-30T23:59:59Z",
    completed: false,
    description: "Meta semestral de volumen en Ethereum"
  },
  {
    id: "g3",
    user_id: "user1",
    payment_method_id: "pm4",
    target_volume: 10000,
    current_volume: 3000,
    start_date: "2023-01-01T00:00:00Z",
    end_date: "2023-12-31T23:59:59Z",
    completed: false,
    description: "Meta anual de volumen en Coinbase"
  }
];

// Estadísticas de ejemplo
export const stats: Stat[] = [
  {
    id: "s1",
    user_id: "user1",
    date: "2023-03-10T00:00:00Z",
    total_profit: 150,
    transaction_count: 5,
    volume: 2500,
    time_frame: "day"
  },
  {
    id: "s2",
    user_id: "user1",
    date: "2023-03-11T00:00:00Z",
    total_profit: 180,
    transaction_count: 7,
    volume: 3000,
    time_frame: "day"
  },
  {
    id: "s3",
    user_id: "user1",
    date: "2023-03-12T00:00:00Z",
    total_profit: 200,
    transaction_count: 8,
    volume: 3500,
    time_frame: "day"
  },
  {
    id: "s4",
    user_id: "user1",
    date: "2023-03-13T00:00:00Z",
    total_profit: 220,
    transaction_count: 9,
    volume: 4000,
    time_frame: "day"
  },
  {
    id: "s5",
    user_id: "user1",
    date: "2023-03-14T00:00:00Z",
    total_profit: 250,
    transaction_count: 10,
    volume: 4500,
    time_frame: "day"
  }
];

// Función para obtener estadísticas por método de pago
export const getPaymentMethodStats = (methodId: string): PaymentMethodStat => {
  const methodTransactions = transactions.filter(
    (t) => t.source_method_id === methodId || t.destination_method_id === methodId
  );

  return {
    id: `pms-${methodId}`,
    stat_id: "s1",
    payment_method_id: methodId,
    profit: methodTransactions.reduce((sum, t) => sum + t.profit, 0),
    volume: methodTransactions.reduce((sum, t) => sum + t.amount, 0),
    transaction_count: methodTransactions.length
  };
};

// Función para obtener estadísticas generales
export const getGeneralStats = (): Stat => {
  return {
    id: "general",
    user_id: "user1",
    date: new Date().toISOString(),
    total_profit: transactions.reduce((sum, t) => sum + t.profit, 0),
    transaction_count: transactions.length,
    volume: transactions.reduce((sum, t) => sum + t.amount, 0),
    time_frame: "month"
  };
};
