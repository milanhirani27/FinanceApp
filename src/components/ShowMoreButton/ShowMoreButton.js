import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './ShowMoreButton.styles';

const ShowMoreButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.showMoreButton} onPress={onPress}>
      <Text style={styles.showMoreText}>Show More</Text>
      <Icon name="chevron-right" size={20} color="#6200ee" />
    </TouchableOpacity>
  );
};

export default ShowMoreButton;