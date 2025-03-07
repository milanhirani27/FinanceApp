import React, {useState, useMemo} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TransactionCard from '../components/TransactionCard/TransactionCard';
import SearchFilterBar from '../components/SearchFilterBar/SearchFilterBar';
import TransactionModal from '../components/TransactionModal/TransactionModal';
import FilterModal from '../components/FilterModal/FilterModal';

const TransactionManagementScreen = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: '2025-03-07',
      amount: 500,
      currency: 'INR',
      category: 'Food',
      description: 'Lunch at Cafe',
    },
    {
      id: 2,
      date: '2025-03-07',
      amount: 300,
      currency: 'INR',
      category: 'Entertainment',
      description: 'Movie tickets',
    },
    {
      id: 3,
      date: '2025-03-07',
      amount: 700,
      currency: 'INR',
      category: 'Utilities',
      description: 'Electricity bill',
    },
    {
      id: 4,
      date: '2025-03-07',
      amount: 300,
      currency: 'INR',
      category: 'Entertainment',
      description: 'Movie tickets',
    },
    {
      id: 5,
      date: '2025-03-07',
      amount: 300,
      currency: 'INR',
      category: 'Entertainment',
      description: 'Movie tickets',
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [newTransaction, setNewTransaction] = useState({
    category: '',
    description: '',
    amount: '',
    currency: 'INR',
    date: new Date().toISOString().split('T')[0],
  });
  const currencies = [
    {code: 'INR', symbol: '₹', rate: 1}, // Base currency
    {code: 'USD', symbol: '$', rate: 75}, // 1 USD = 75 INR
    {code: 'EUR', symbol: '€', rate: 85}, // 1 EUR = 85 INR
  ];

  // Convert amount from INR to the selected currency
  const convertFromINR = (amountInINR, currency) => {
    const selectedCurrency = currencies.find(c => c.code === currency);
    if (!selectedCurrency) return amountInINR;
    return (parseFloat(amountInINR) / selectedCurrency.rate).toFixed(2);
  };

  // Save Edited Transaction (updated)
  const saveEditedTransaction = updatedTransaction => {
    if (selectedTransaction) {
      const updatedTransactions = transactions.map(transaction =>
        transaction.id === selectedTransaction.id
          ? {...transaction, ...updatedTransaction}
          : transaction,
      );
      setTransactions(updatedTransactions);
      setIsEditModalVisible(false);
      resetModalState();
    }
  };

  // Handle save transaction
  const handleSave = transaction => {
    const newTransactionItem = {
      id: transactions.length + 1,
      ...transaction,
    };
    setTransactions([...transactions, newTransactionItem]);
    setIsAddModalVisible(false);
    setNewTransaction({
      category: '',
      description: '',
      amount: '',
      currency: 'INR',
      date: new Date().toISOString().split('T')[0],
    });
  };

  // Open Edit Modal
  const openEditModal = transaction => {
    const amountInSelectedCurrency = convertFromINR(
      transaction.amount,
      transaction.currency,
    );
    setSelectedTransaction(transaction);
    setNewTransaction({
      category: transaction.category,
      description: transaction.description,
      amount: amountInSelectedCurrency, // Convert amount to the selected currency
      currency: transaction.currency,
      date: transaction.date,
    });
    setIsEditModalVisible(true);
  };

  // Delete Transaction with Confirmation
  const deleteTransaction = id => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () =>
            setTransactions(
              transactions.filter(transaction => transaction.id !== id),
            ),
        },
      ],
    );
  };

  // Search and Filter
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        filterCategory === 'All' || transaction.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [transactions, searchQuery, filterCategory]);

  // Reset Modal State
  const resetModalState = () => {
    setNewTransaction({
      category: '',
      description: '',
      amount: '',
      currency: 'INR',
      date: new Date().toISOString().split('T')[0],
    });
    setSelectedTransaction(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Search and Filter Bar */}
        <SearchFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterCategory={filterCategory}
          onFilterPress={() => setIsFilterModalVisible(true)}
        />

        {/* Transaction List */}
        <FlatList
          data={filteredTransactions}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TransactionCard
              item={item}
              onEdit={openEditModal}
              onDelete={deleteTransaction}
            />
          )}
          contentContainerStyle={styles.transactionList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No transactions found.</Text>
          }
        />

        {/* Add Transaction Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setIsAddModalVisible(true);
            resetModalState();
          }}>
          <Icon name="plus" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Filter Modal */}
        <FilterModal
          isVisible={isFilterModalVisible}
          onClose={() => setIsFilterModalVisible(false)}
          onSelectCategory={category => {
            setFilterCategory(category);
            setIsFilterModalVisible(false);
          }}
        />

        {/* Add/Edit Transaction Modal */}
        <TransactionModal
          isVisible={isAddModalVisible || isEditModalVisible}
          onClose={() => {
            if (isAddModalVisible) setIsAddModalVisible(false);
            else setIsEditModalVisible(false);
            resetModalState();
          }}
          isAddModal={isAddModalVisible}
          newTransaction={newTransaction}
          setNewTransaction={setNewTransaction}
          onSave={isAddModalVisible ? handleSave : saveEditedTransaction} // Pass saveEditedTransaction
          isFormValid={
            newTransaction.category &&
            newTransaction.description &&
            newTransaction.amount
          }
          convertFromINR={convertFromINR} // Pass the conversion function
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
  },
  searchCloseButton: {
    marginLeft: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 8,
  },
  filterText: {
    marginLeft: 8,
    color: '#6200ee',
    fontSize: 16,
  },
  transactionList: {
    paddingBottom: 16,
  },
  transactionCard: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#6200ee',
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 24,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#6200ee',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  modalItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
    color: '#6200ee',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#6200ee',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  cancelButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#6200ee',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButtonText: {
    color: '#6200ee',
    fontWeight: 'bold',
    fontSize: 16,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryLabel: {
    fontSize: 16,
    color: '#6200ee',
    marginBottom: 8,
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    padding: 8,
    margin: 4,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#6200ee',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#000',
  },
  selectedCategoryText: {
    color: '#fff',
  },
});

export default TransactionManagementScreen;
