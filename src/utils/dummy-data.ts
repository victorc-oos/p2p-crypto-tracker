
import { 
  PaymentMethod, 
  Transaction, 
  Goal, 
  Stat,
  PaymentMethodStat 
} from './types';

// Generate a random ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Payment Methods
export const paymentMethods: PaymentMethod[] = [
  {
    id: generateId(),
    name: 'Banco de Venezuela',
    type: 'bank',
    balance: 5000,
    currency: 'VES',
    description: 'Main bank account',
    createdAt: new Date('2023-01-15'),
  },
  {
    id: generateId(),
    name: 'Zinli',
    type: 'wallet',
    balance: 2500,
    currency: 'USD',
    description: 'Digital wallet for USD',
    createdAt: new Date('2023-01-20'),
  },
  {
    id: generateId(),
    name: 'PayPal',
    type: 'wallet',
    balance: 1500,
    currency: 'USD',
    description: 'For international payments',
    createdAt: new Date('2023-02-05'),
  },
  {
    id: generateId(),
    name: 'Binance',
    type: 'exchange',
    balance: 3000,
    currency: 'USDT',
    description: 'Main crypto exchange',
    createdAt: new Date('2023-01-10'),
  },
  {
    id: generateId(),
    name: 'El Dorado',
    type: 'exchange',
    balance: 1000,
    currency: 'USDT',
    description: 'Local crypto exchange',
    createdAt: new Date('2023-03-01'),
  },
];

// Transactions
const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const today = new Date();
  
  // Generate 50 random transactions over the last 3 months
  for (let i = 0; i < 50; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - Math.floor(Math.random() * 90)); // Random date in last 90 days
    
    const type = Math.random() > 0.5 ? 'buy' : 'sell';
    const amount = Math.floor(Math.random() * 1000) + 100; // 100-1100 USDT
    const rate = 28 + Math.random() * 4; // Rate between 28-32
    const localAmount = amount * rate;
    const fee = Math.random() * 2; // 0-2% fee
    const feeAmount = (amount * fee) / 100;
    
    // Random profit/loss calculation
    let profit = 0;
    if (type === 'buy') {
      profit = -(feeAmount * rate); // Loss from fees
    } else {
      profit = (amount * 0.01 * rate) - (feeAmount * rate); // 1% profit minus fees
    }
    
    // Random source and destination
    const sourceMethodIdx = Math.floor(Math.random() * paymentMethods.length);
    let destMethodIdx = Math.floor(Math.random() * paymentMethods.length);
    while (destMethodIdx === sourceMethodIdx) {
      destMethodIdx = Math.floor(Math.random() * paymentMethods.length);
    }
    
    transactions.push({
      id: generateId(),
      type,
      amount,
      localAmount,
      rate,
      fee,
      profit,
      sourceMethodId: paymentMethods[sourceMethodIdx].id,
      destinationMethodId: paymentMethods[destMethodIdx].id,
      date,
      platform: ['Binance P2P', 'LocalBitcoins', 'AirTM', 'El Dorado', 'Direct'][Math.floor(Math.random() * 5)],
      description: `Transaction with user ${Math.random().toString(36).substring(2, 8)}`,
    });
  }
  
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date desc
};

export const transactions = generateTransactions();

// Goals
export const goals: Goal[] = [
  {
    id: generateId(),
    paymentMethodId: paymentMethods[0].id,
    targetVolume: 50000,
    currentVolume: 35000,
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-12-31'),
    completed: false,
    description: 'Yearly volume target for Bank of Venezuela',
  },
  {
    id: generateId(),
    paymentMethodId: paymentMethods[1].id,
    targetVolume: 25000,
    currentVolume: 22000,
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-08-31'),
    completed: false,
    description: 'Q3 target for Zinli',
  },
  {
    id: generateId(),
    paymentMethodId: paymentMethods[3].id,
    targetVolume: 100000,
    currentVolume: 48000,
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-12-31'),
    completed: false,
    description: 'Yearly Binance target',
  },
];

// Generate stats
const generateStats = (): Stat[] => {
  const stats: Stat[] = [];
  const today = new Date();
  
  // Generate daily stats for the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    // Find transactions for this day
    const dayTransactions = transactions.filter(t => {
      const tDate = new Date(t.date);
      return tDate.getFullYear() === date.getFullYear() &&
             tDate.getMonth() === date.getMonth() &&
             tDate.getDate() === date.getDate();
    });
    
    // Calculate stats
    const totalProfit = dayTransactions.reduce((sum, t) => sum + t.profit, 0);
    const volume = dayTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    // Payment method stats
    const methodStats: PaymentMethodStat[] = [];
    
    for (const method of paymentMethods) {
      const methodTxs = dayTransactions.filter(t => 
        t.sourceMethodId === method.id || t.destinationMethodId === method.id
      );
      
      if (methodTxs.length > 0) {
        methodStats.push({
          paymentMethodId: method.id,
          profit: methodTxs.reduce((sum, t) => sum + t.profit, 0),
          volume: methodTxs.reduce((sum, t) => sum + t.amount, 0),
          transactionCount: methodTxs.length,
        });
      }
    }
    
    stats.push({
      date,
      totalProfit,
      transactionCount: dayTransactions.length,
      volume,
      paymentMethodStats: methodStats,
    });
  }
  
  return stats;
};

export const stats = generateStats();
