import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  budgetCard: {
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  budgetCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  budgetAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  budgetActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    marginLeft: 16,
  },
});

export default styles;