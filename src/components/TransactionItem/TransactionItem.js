// src/components/TransactionItem/TransactionItem.js
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './TransactionItem.styles';

const TransactionItem = ({ category, amount, date }) => {
  return (
    <View style={styles.transactionItem}>
      <Icon name="cash" size={20} color="#6200ee" />
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionCategory}>{category}</Text>
        <Text style={styles.transactionDate}>{date}</Text>
      </View>
      <Text style={styles.transactionAmount}>₹{amount.toLocaleString()}</Text>
    </View>
  );
};

export default TransactionItem;