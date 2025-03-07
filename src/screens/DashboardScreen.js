import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { PieChart, LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

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
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Purple
        strokeWidth: 2,
      },
    ],
  };

  // Show only the first 3 transactions
  const displayedTransactions = recentTransactions.slice(0, 3);

  return (
    <ScrollView style={styles.container}>
      {/* Total Balance */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Total Balance</Text>
          <Text style={styles.cardAmount}>₹{totalBalance.toLocaleString()}</Text>
        </View>
      </View>

      {/* Budget Overview */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Budget Overview</Text>
          <Text style={styles.budgetText}>
            Total Budget: ₹{budgetOverview.totalBudget.toLocaleString()}
          </Text>
          <Text style={styles.budgetText}>Spent: ₹{budgetOverview.spent.toLocaleString()}</Text>
          <Text style={styles.budgetText}>
            Remaining: ₹{budgetOverview.remaining.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Recent Transactions</Text>
          {displayedTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <Icon name="cash" size={20} color="#6200ee" />
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionCategory}>{transaction.category}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text style={styles.transactionAmount}>₹{transaction.amount.toLocaleString()}</Text>
            </View>
          ))}
          {/* Show More Button */}
          {recentTransactions.length > 3 && (
            <TouchableOpacity
              style={styles.showMoreButton}
              onPress={() => navigation.navigate('Transactions')} // Navigate to Transaction Screen
            >
              <Text style={styles.showMoreText}>Show More</Text>
              <Icon name="chevron-right" size={20} color="#6200ee" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Expense Distribution Pie Chart */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Expense Distribution</Text>
          <PieChart
            data={expenseDistribution}
            width={width - 40}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </View>

      {/* Monthly Expenditure Line Chart */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Monthly Expenditure</Text>
          <LineChart
            data={monthlyExpenditure}
            width={width - 40}
            height={220}
            yAxisLabel="₹"
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // For Android
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 8,
  },
  budgetText: {
    fontSize: 14,
    paddingBottom: 5,
  },
  cardAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    paddingTop: 8,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 10,
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  showMoreText: {
    fontSize: 16,
    color: '#6200ee',
    marginRight: 5,
  },
});

export default DashboardScreen;