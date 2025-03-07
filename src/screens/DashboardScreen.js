// src/screens/DashboardScreen.js
import React from 'react';
import { ScrollView, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/Card/Card';
import TransactionItem from '../components/TransactionItem/TransactionItem';
import ShowMoreButton from '../components/ShowMoreButton/ShowMoreButton';
import PieChartCard from '../components/PieChartCard/PieChartCard';
import LineChartCard from '../components/LineChartCard/LineChartCard';

const DashboardScreen = () => {
  const navigation = useNavigation();

  // Sample data
  const totalBalance = 12000;
  const budgetOverview = {
    totalBudget: 15000,
    spent: 8000,
    remaining: 7000,
  };
  const recentTransactions = [
    { id: 1, category: 'Food', amount: 500, date: '2025-03-07' },
    { id: 2, category: 'Entertainment', amount: 300, date: '2023-03-07' },
    { id: 3, category: 'Utilities', amount: 700, date: '2023-03-07' },
    { id: 4, category: 'Transport', amount: 400, date: '2023-03-07' },
    { id: 5, category: 'Shopping', amount: 600, date: '2023-03-07' },
  ];
  const expenseDistribution = [
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
  const monthlyExpenditure = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July'],
    datasets: [
      {
        data: [5000, 6000, 5500, 7000, 6500, 8000, 6000],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // Show only the first 3 transactions
  const displayedTransactions = recentTransactions.slice(0, 3);

  return (
    <ScrollView style={styles.container}>
      {/* Total Balance */}
      <Card title="Total Balance">
        <Text style={styles.cardAmount}>₹{totalBalance.toLocaleString()}</Text>
      </Card>

      {/* Budget Overview */}
      <Card title="Budget Overview">
        <Text style={styles.budgetText}>
          Total Budget: ₹{budgetOverview.totalBudget.toLocaleString()}
        </Text>
        <Text style={styles.budgetText}>Spent: ₹{budgetOverview.spent.toLocaleString()}</Text>
        <Text style={styles.budgetText}>
          Remaining: ₹{budgetOverview.remaining.toLocaleString()}
        </Text>
      </Card>

      {/* Recent Transactions */}
      <Card title="Recent Transactions">
        {displayedTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            category={transaction.category}
            amount={transaction.amount}
            date={transaction.date}
          />
        ))}
        {recentTransactions.length > 3 && (
          <ShowMoreButton onPress={() => navigation.navigate('Transactions')} />
        )}
      </Card>

      {/* Expense Distribution Pie Chart */}
      <PieChartCard data={expenseDistribution} title="Expense Distribution" />

      {/* Monthly Expenditure Line Chart */}
      <LineChartCard data={monthlyExpenditure} title="Monthly Expenditure" />
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  cardAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    paddingTop: 8,
  },
  budgetText: {
    fontSize: 14,
    paddingBottom: 5,
  },
};

export default DashboardScreen;