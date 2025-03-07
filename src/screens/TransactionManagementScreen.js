import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity, Modal, TextInput, Keyboard, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const TransactionManagementScreen = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2025-03-07', amount: 500, category: 'Food', description: 'Lunch at Cafe' },
    { id: 2, date: '2025-03-07', amount: 300, category: 'Entertainment', description: 'Movie tickets' },
    { id: 3, date: '2025-03-07', amount: 700, category: 'Utilities', description: 'Electricity bill' },
    { id: 4, date: '2025-03-07', amount: 300, category: 'Entertainment', description: 'Movie tickets' },
    { id: 5, date: '2025-03-07', amount: 300, category: 'Entertainment', description: 'Movie tickets' },
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
    date: new Date().toISOString().split('T')[0],
  });

  // Add Transaction
  const addTransaction = () => {
    const newTransactionItem = {
      id: transactions.length + 1,
      date: newTransaction.date,
      amount: parseFloat(newTransaction.amount),
      category: newTransaction.category,
      description: newTransaction.description,
    };
    setTransactions([...transactions, newTransactionItem]);
    setIsAddModalVisible(false);
    setNewTransaction({ category: '', description: '', amount: '', date: new Date().toISOString().split('T')[0] });
  };

  // Open Edit Modal
  const openEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setNewTransaction({
      category: transaction.category,
      description: transaction.description,
      amount: transaction.amount.toString(),
      date: transaction.date,
    });
    setIsEditModalVisible(true);
  };

  // Save Edited Transaction
  const saveEditedTransaction = () => {
    if (selectedTransaction) {
      const updatedTransactions = transactions.map((transaction) =>
        transaction.id === selectedTransaction.id
          ? {
              ...transaction,
              category: newTransaction.category,
              description: newTransaction.description,
              amount: parseFloat(newTransaction.amount),
              date: newTransaction.date,
            }
          : transaction
      );
      setTransactions(updatedTransactions);
      setIsEditModalVisible(false);
    }
  };

  // Delete Transaction with Confirmation
  const deleteTransaction = (id) => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => setTransactions(transactions.filter((transaction) => transaction.id !== id)) },
      ]
    );
  };

  // Search and Filter
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'All' || transaction.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [transactions, searchQuery, filterCategory]);

  // Render Transaction Item
  const renderTransactionItem = ({ item }) => (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <View style={styles.transactionCard}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionCategory}>{item.category}</Text>
          <Text style={styles.transactionAmount}>₹{item.amount}</Text>
        </View>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
        <View style={styles.transactionActions}>
          <TouchableOpacity onPress={() => openEditModal(item)} style={styles.actionButton}>
            <Icon name="pencil" size={20} color="#6200ee" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteTransaction(item.id)} style={styles.actionButton}>
            <Icon name="delete" size={20} color="#ff4444" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );

  // Check if all fields are filled
  const isFormValid = () => {
    return newTransaction.category && newTransaction.description && newTransaction.amount;
  };

  // Reset Modal State
  const resetModalState = () => {
    setNewTransaction({ category: '', description: '', amount: '', date: new Date().toISOString().split('T')[0] });
    setSelectedTransaction(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Search and Filter Bar */}
        <View style={styles.searchFilterContainer}>
          <View style={styles.searchBarContainer}>
            <Icon name="magnify" size={20} color="#6200ee" style={styles.searchIcon} />
            <TextInput
              style={styles.searchBar}
              placeholder="Search transactions"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.searchCloseButton}>
                <Icon name="close" size={20} color="#6200ee" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.filterButton} onPress={() => setIsFilterModalVisible(true)}>
            <Icon name="filter" size={20} color="#6200ee" />
            <Text style={styles.filterText}>{filterCategory}</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction List */}

          <FlatList
            data={filteredTransactions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTransactionItem}
            contentContainerStyle={styles.transactionList}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No transactions found.</Text>
            }
            scrollEnabled={true} // Disable scrolling for FlatList since the parent ScrollView handles it
          />

        {/* Add Transaction Button */}
        <TouchableOpacity style={styles.addButton} onPress={() => { setIsAddModalVisible(true); resetModalState(); }}>
          <Icon name="plus" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Filter Modal */}
        <Modal
          visible={isFilterModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsFilterModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setIsFilterModalVisible(false)}>
                <Icon name="close" size={20} color="#6200ee" />
              </TouchableOpacity>
              <ScrollView>
                <TouchableOpacity style={styles.modalItem} onPress={() => { setFilterCategory('All'); setIsFilterModalVisible(false); }}>
                  <Text style={styles.modalItemText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={() => { setFilterCategory('Food'); setIsFilterModalVisible(false); }}>
                  <Text style={styles.modalItemText}>Food</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={() => { setFilterCategory('Entertainment'); setIsFilterModalVisible(false); }}>
                  <Text style={styles.modalItemText}>Entertainment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={() => { setFilterCategory('Utilities'); setIsFilterModalVisible(false); }}>
                  <Text style={styles.modalItemText}>Utilities</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={() => { setFilterCategory('Transport'); setIsFilterModalVisible(false); }}>
                  <Text style={styles.modalItemText}>Transport</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Add/Edit Transaction Modal */}
        <Modal
          visible={isAddModalVisible || isEditModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => {
            setIsAddModalVisible(false);
            setIsEditModalVisible(false);
            resetModalState();
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{isAddModalVisible ? 'Add Transaction' : 'Edit Transaction'}</Text>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => { setIsAddModalVisible(false); setIsEditModalVisible(false); resetModalState(); }}>
                <Icon name="close" size={20} color="#6200ee" />
              </TouchableOpacity>
              <View style={styles.categoryContainer}>
                <Text style={styles.categoryLabel}>Category:</Text>
                <View style={styles.categoryButtons}>
                  {['Food', 'Entertainment', 'Utilities', 'Transport'].map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.categoryButton,
                        newTransaction.category === category && styles.selectedCategoryButton,
                      ]}
                      onPress={() => setNewTransaction({ ...newTransaction, category })}
                    >
                      <Text
                        style={[
                          styles.categoryButtonText,
                          newTransaction.category === category && styles.selectedCategoryText,
                        ]}
                      >
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={newTransaction.description}
                onChangeText={(text) => setNewTransaction({ ...newTransaction, description: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Amount"
                value={newTransaction.amount}
                onChangeText={(text) => setNewTransaction({ ...newTransaction, amount: text.replace(/[^0-9]/g, '') })}
                keyboardType="numeric"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.saveButton, !isFormValid() && styles.disabledButton]}
                  onPress={isAddModalVisible ? addTransaction : saveEditedTransaction}
                  disabled={!isFormValid()}
                >
                  <Text style={styles.buttonText}>{isAddModalVisible ? 'Add' : 'Save'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => { setIsAddModalVisible(false); setIsEditModalVisible(false); resetModalState(); }}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 2 },
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