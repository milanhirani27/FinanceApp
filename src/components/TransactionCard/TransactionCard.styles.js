import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  transactionCard: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  transactionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
  },
  transactionActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    marginHorizontal: 8,
  },
});

export default styles;