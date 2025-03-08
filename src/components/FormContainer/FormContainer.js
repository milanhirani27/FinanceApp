import React from 'react';
import { View, Text } from 'react-native';
import styles from './FormContainer.styles';

const FormContainer = ({ children, title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {children}
    </View>
  );
};

export default FormContainer;