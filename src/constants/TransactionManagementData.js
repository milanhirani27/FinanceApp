export const transactionData = [
  {
    id: 1,
    date: '2025-03-07',
    amount: 500,
    currency: 'INR',
    category: 'Food',
    description: 'Lunch at Cafe',
  },
  {
    id: 2,
    date: '2025-03-07',
    amount: 300,
    currency: 'INR',
    category: 'Entertainment',
    description: 'Movie tickets',
  },
  {
    id: 3,
    date: '2025-03-07',
    amount: 700,
    currency: 'INR',
    category: 'Utilities',
    description: 'Electricity bill',
  },
  {
    id: 4,
    date: '2025-03-07',
    amount: 300,
    currency: 'INR',
    category: 'Entertainment',
    description: 'Movie tickets',
  },
  {
    id: 5,
    date: '2025-03-07',
    amount: 300,
    currency: 'INR',
    category: 'Entertainment',
    description: 'Movie tickets',
  },
];

export default newTransactionData = {
  category: '',
  description: '',
  amount: '',
  currency: 'INR',
  date: new Date().toISOString().split('T')[0],
};

export const currencies = [
    {code: 'INR', symbol: '₹', rate: 1}, // Base currency
    {code: 'USD', symbol: '$', rate: 75}, // 1 USD = 75 INR
    {code: 'EUR', symbol: '€', rate: 85}, // 1 EUR = 85 INR
  ];
