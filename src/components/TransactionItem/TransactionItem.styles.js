import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 10,
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
  },
});

export default styles;