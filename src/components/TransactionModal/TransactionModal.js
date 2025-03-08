import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryButtons from '../CategoryButtons/CategoryButtons';
import styles from './TransactionModal.styles';

const currencies = [
  {code: 'INR', symbol: '₹', rate: 1}, // Base currency
  {code: 'USD', symbol: '$', rate: 75}, // 1 USD = 75 INR
  {code: 'EUR', symbol: '€', rate: 85}, // 1 EUR = 85 INR
];

const TransactionModal = ({
  isVisible,
  onClose,
  isAddModal,
  newTransaction,
  setNewTransaction,
  onSave,
  isFormValid,
  convertFromINR,
}) => {
  const [isCurrencyDropdownVisible, setIsCurrencyDropdownVisible] = useState(false);

  const handleCurrencySelect = currency => {
    const selectedCurrency = currencies.find(c => c.code === currency);
    if (!selectedCurrency) return;
    const currentAmount = newTransaction.amount || '0';
    const amountInINR = convertToINR(currentAmount, newTransaction.currency);
    const amountInNewCurrency = convertFromINR(amountInINR, currency);
    setNewTransaction({
      ...newTransaction,
      currency,
      amount: amountInNewCurrency || '',
    });
    setIsCurrencyDropdownVisible(false);
  };

  const convertToINR = (amount, currency) => {
    const parsedAmount = parseFloat(amount || 0);
    const selectedCurrency = currencies.find(c => c.code === currency);
    if (!selectedCurrency) {
      console.log('Invalid currency:', currency);
      return parsedAmount;
    }
    return parsedAmount * selectedCurrency.rate;
  };

  const handleSave = () => {
    const amountInINR = convertToINR(
      newTransaction.amount,
      newTransaction.currency,
    );
    const transactionToSave = {
      ...newTransaction,
      amount: amountInINR,
      currency: 'INR',
    };
    onSave(transactionToSave);
  };

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {isAddModal ? 'Add Transaction' : 'Edit Transaction'}
          </Text>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Icon name="close" size={20} color="#6200ee" />
          </TouchableOpacity>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryLabel}>Category:</Text>
            <CategoryButtons
              selectedCategory={newTransaction.category}
              onSelectCategory={category =>
                setNewTransaction({...newTransaction, category})
              }
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={newTransaction.description}
            onChangeText={text =>
              setNewTransaction({...newTransaction, description: text})
            }
          />
          <View style={styles.amountContainer}>
            <TouchableOpacity
              style={styles.currencyDropdownButton}
              onPress={() =>
                setIsCurrencyDropdownVisible(!isCurrencyDropdownVisible)
              }>
              <Text style={styles.currencyDropdownText}>
                {newTransaction.currency || 'INR'}
              </Text>
              <Icon
                name={isCurrencyDropdownVisible ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#6200ee"
              />
            </TouchableOpacity>
            {isCurrencyDropdownVisible && (
              <View style={styles.currencyDropdownOptions}>
                {currencies.map(currency => (
                  <TouchableOpacity
                    key={currency.code}
                    style={styles.currencyOption}
                    onPress={() => handleCurrencySelect(currency.code)}>
                    <Text style={styles.currencyOptionText}>
                      {currency.code} ({currency.symbol})
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <TextInput
              style={styles.amountInput}
              placeholder="Amount"
              value={newTransaction.amount}
              onChangeText={text =>
                setNewTransaction({
                  ...newTransaction,
                  amount: text.replace(/[^0-9.]/g, ''),
                })
              }
              keyboardType="numeric"
            />
          </View>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.saveButton, !isFormValid && styles.disabledButton]}
              onPress={handleSave}
              disabled={!isFormValid}>
              <Text style={styles.buttonText}>
                {isAddModal ? 'Add' : 'Save'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TransactionModal;