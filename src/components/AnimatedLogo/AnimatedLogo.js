// src/components/AnimatedLogo/AnimatedLogo.js
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import styles from './AnimatedLogo.styles';

const AnimatedLogo = ({ scale }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Icon name="account-circle" size={70} color="#fff" />
      <Text style={styles.text}>Welcome</Text>
    </Animated.View>
  );
};

export default AnimatedLogo;