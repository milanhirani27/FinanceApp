// src/components/Button/Button.styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;