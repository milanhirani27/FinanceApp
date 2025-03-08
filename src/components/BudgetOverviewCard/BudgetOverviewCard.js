import React from 'react';
import { Text } from 'react-native';
import Card from '../../components/Card/Card';
import styles from './BudgetOverviewCard.styles';

const BudgetOverviewCard = ({budgetOverview, title}) => {
  return (
    <Card title={title}>
      <Text style={styles.budgetText}>
        Total Budget: ₹{budgetOverview.totalBudget.toLocaleString()}
      </Text>
      <Text style={styles.budgetText}>
        Spent: ₹{budgetOverview.spent.toLocaleString()}
      </Text>
      <Text style={styles.budgetText}>
        Remaining: ₹{budgetOverview.remaining.toLocaleString()}
      </Text>
    </Card>
  );
};

export default BudgetOverviewCard;
