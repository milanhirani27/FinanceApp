import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './AddButton.styles';

const AddButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Icon name="plus" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

export default AddButton;
