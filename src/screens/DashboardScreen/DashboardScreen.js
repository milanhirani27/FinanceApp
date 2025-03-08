import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Card from '../../components/Card/Card';
import TransactionItem from '../../components/TransactionItem/TransactionItem';
import ShowMoreButton from '../../components/ShowMoreButton/ShowMoreButton';
import PieChartCard from '../../components/PieChartCard/PieChartCard';
import LineChartCard from '../../components/LineChartCard/LineChartCard';
import BudgetOverviewCard from '../../components/BudgetOverviewCard/BudgetOverviewCard';
import styles from './DashboardScreen.styles';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const {
    totalBalance,
    budgetOverview,
    recentTransactions,
    expenseDistribution,
    monthlyExpenditure,
  } = useSelector((state) => state.dashboard);

  const displayedTransactions = recentTransactions.slice(0, 3);

  return (
    <ScrollView style={styles.container}>
      <Card title="Total Balance">
        <Text style={styles.cardAmount}>₹{totalBalance.toLocaleString()}</Text>
      </Card>
      <BudgetOverviewCard budgetOverview={budgetOverview} title={'Budget Overview'} />
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
      <PieChartCard data={expenseDistribution} title="Expense Distribution" />
      <LineChartCard data={monthlyExpenditure} title="Monthly Expenditure" />
    </ScrollView>
  );
};

export default DashboardScreen;