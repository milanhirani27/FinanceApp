import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import styles from './TransactionCard.styles';

const TransactionCard= ({ item, onEdit, onDelete }) => {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <View style={styles.transactionCard}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionCategory}>{item.category}</Text>
          <Text style={styles.transactionAmount}>₹{item.amount}</Text>
        </View>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
        <View style={styles.transactionActions}>
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

export default TransactionCard;