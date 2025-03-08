import React from 'react';
import { View, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './InputField.styles';

const InputField = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  iconName,
  error,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name={iconName} size={20} color="#6200ee" style={styles.icon} />
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          style={styles.input}
          placeholderTextColor="#666"
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputField;