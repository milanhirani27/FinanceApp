// src/components/InputField/InputField.styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#6200ee',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default styles;