// src/components/BudgetItem/BudgetItem.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './BudgetItem.styles';

const BudgetItem = ({ item, onEdit, onDelete }) => {
  const utilization = item.spent / item.budget;
  const isExceeding = utilization >= 1;
  const isApproaching = utilization >= 0.8;

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <View style={styles.budgetCard}>
        <View style={styles.budgetHeader}>
          <Text style={styles.budgetCategory}>{item.category}</Text>
          <Text style={styles.budgetAmount}>₹{item.spent} / ₹{item.budget}</Text>
        </View>
        <ProgressBar
          progress={utilization}
          color={isExceeding ? '#ff4444' : isApproaching ? '#ffbb33' : '#00C851'}
        />
        <View style={styles.budgetActions}>
          <TouchableOpacity onPress={() => onEdit(item)} style={styles.actionButton}>
            <Icon name="pencil" size={20} color="#6200ee" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.actionButton}>
            <Icon name="delete" size={20} color="#ff4444" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default BudgetItem;