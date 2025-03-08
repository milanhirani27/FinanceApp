export const totalBalance = 12000;

export const budgetOverview = {
  totalBudget: 15000,
  spent: 8000,
  remaining: 7000,
};

export const recentTransactions = [
  { id: 1, category: 'Food', amount: 500, date: '2023-03-07' },
  { id: 2, category: 'Entertainment', amount: 300, date: '2023-03-07' },
  { id: 3, category: 'Utilities', amount: 700, date: '2023-03-07' },
  { id: 4, category: 'Transport', amount: 400, date: '2023-03-07' },
  { id: 5, category: 'Shopping', amount: 600, date: '2023-03-07' },
];

export const expenseDistribution = [
  {
    name: 'Food',
    amount: 2000,
    color: '#FF6384',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Entertainment',
    amount: 1000,
    color: '#36A2EB',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Utilities',
    amount: 1500,
    color: '#FFCE56',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Transport',
    amount: 800,
    color: '#4BC0C0',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

export const monthlyExpenditure = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July'],
  datasets: [
    {
      data: [5000, 6000, 5500, 7000, 6500, 8000, 6000],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};