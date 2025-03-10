import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './AnimatedLogo.styles';

const AnimatedLogo = () => {

  return (
    <View style={styles.container}>
      <Icon name="account-circle" size={70} color="#fff" />
      <Text style={styles.text}>Welcome</Text>
    </View>
  );
};

export default AnimatedLogo;