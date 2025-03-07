import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Card, Button, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const CurrencyConversionScreen = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('INR'); // Base currency is INR
  const [transactions, setTransactions] = useState([]);
  const [isAddTransactionModalVisible, setIsAddTransactionModalVisible] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    currency: 'USD', // Default foreign currency
    description: '',
  });

  // Fetch Exchange Rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          `https://open.er-api.com/v6/latest/${baseCurrency}`
        );
        setExchangeRates(response.data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, [baseCurrency]);

  // Add Transaction
  const addTransaction = () => {
    if (newTransaction.amount && newTransaction.description) {
      const amountInForeignCurrency = parseFloat(newTransaction.amount);
      const exchangeRate = exchangeRates[newTransaction.currency];

      if (!exchangeRate) {
        alert('Invalid currency selected.');
        return;
      }

      // Convert foreign currency to base currency (INR)
      const convertedAmount = amountInForeignCurrency * exchangeRate;

      const transaction = {
        id: transactions.length + 1,
        amount: amountInForeignCurrency.toFixed(2),
        currency: newTransaction.currency,
        description: newTransaction.description,
        convertedAmount: convertedAmount.toFixed(2),
        baseCurrency,
      };

      setTransactions([...transactions, transaction]);
      setIsAddTransactionModalVisible(false);
      setNewTransaction({ amount: '', currency: 'USD', description: '' });
    }
  };

  // Render Transaction Item
  const renderTransactionItem = ({ item }) => (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <Card style={styles.transactionCard}>
        <Card.Content>
          <View style={styles.transactionHeader}>
            <Text style={styles.transactionDescription}>{item.description}</Text>
            <Text style={styles.transactionAmount}>
              {item.amount} {item.currency} ≈ {item.convertedAmount} {item.baseCurrency}
            </Text>
          </View>
          <View style={styles.transactionActions}>
            <IconButton
              icon="pencil"
              size={20}
              onPress={() => {}}
            />
            <IconButton icon="delete" size={20} onPress={() => {}} />
          </View>
        </Card.Content>
      </Card>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Transaction List */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTransactionItem}
        contentContainerStyle={styles.transactionList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transactions found.</Text>
        }
      />

      {/* Add Transaction Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setIsAddTransactionModalVisible(true)}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Add Transaction Modal */}
      <Modal
        visible={isAddTransactionModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsAddTransactionModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Transaction</Text>
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={newTransaction.amount}
              onChangeText={(text) => setNewTransaction({ ...newTransaction, amount: text })}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Currency (e.g., USD)"
              value={newTransaction.currency}
              onChangeText={(text) => setNewTransaction({ ...newTransaction, currency: text.toUpperCase() })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newTransaction.description}
              onChangeText={(text) => setNewTransaction({ ...newTransaction, description: text })}
            />
            <View style={styles.modalButtons}>
              <Button mode="contained" onPress={addTransaction} style={styles.saveButton}>
                Save
              </Button>
              <Button mode="outlined" onPress={() => setIsAddTransactionModalVisible(false)} style={styles.cancelButton}>
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  transactionList: {
    paddingBottom: 16,
  },
  transactionCard: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#fff',
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  transactionActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
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
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#6200ee',
  },
  cancelButton: {
    flex: 1,
    marginLeft: 8,
  },
});

export default CurrencyConversionScreen;