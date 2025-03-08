import React, {useState, useMemo} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from 'react-native';
import TransactionCard from '../../components/TransactionCard/TransactionCard';
import SearchFilterBar from '../../components/SearchFilterBar/SearchFilterBar';
import TransactionModal from '../../components/TransactionModal/TransactionModal';
import FilterModal from '../../components/FilterModal/FilterModal';
import styles from './TransactionManagementScreen.styles';
import AddButton from '../../components/AddButton/AddButton';
import { transactionData } from '../../constants/TransactionManagementData';
import { currencies } from '../../constants/TransactionManagementData';

const TransactionManagementScreen = () => {
  const [transactions, setTransactions] = useState(transactionData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [newTransaction, setNewTransaction] = useState(newTransactionData);

  const convertFromINR = (amountInINR, currency) => {
    const selectedCurrency = currencies.find(c => c.code === currency);
    if (!selectedCurrency) return amountInINR;
    return (parseFloat(amountInINR) / selectedCurrency.rate).toFixed(2);
  };

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

  const openEditModal = transaction => {
    const amountInSelectedCurrency = convertFromINR(
      transaction.amount,
      transaction.currency,
    );
    setSelectedTransaction(transaction);
    setNewTransaction({
      category: transaction.category,
      description: transaction.description,
      amount: amountInSelectedCurrency,
      currency: transaction.currency,
      date: transaction.date,
    });
    setIsEditModalVisible(true);
  };

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
        <SearchFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterCategory={filterCategory}
          onFilterPress={() => setIsFilterModalVisible(true)}
        />
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
        <AddButton onPress={() => {
            setIsAddModalVisible(true);
            resetModalState();
          }}/>
        <FilterModal
          isVisible={isFilterModalVisible}
          onClose={() => setIsFilterModalVisible(false)}
          onSelectCategory={category => {
            setFilterCategory(category);
            setIsFilterModalVisible(false);
          }}
        />
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
          onSave={isAddModalVisible ? handleSave : saveEditedTransaction}
          isFormValid={
            newTransaction.category &&
            newTransaction.description &&
            newTransaction.amount
          }
          convertFromINR={convertFromINR}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TransactionManagementScreen;