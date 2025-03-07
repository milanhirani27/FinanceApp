// src/components/Card/Card.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from './Card.styles';

const Card = ({ title, children }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        {children}
      </View>
    </View>
  );
};

export default Card;