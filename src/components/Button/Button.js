// src/components/Button/Button.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './Button.styles';

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;