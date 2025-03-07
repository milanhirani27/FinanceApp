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
  // Handle currency selection
  const handleCurrencySelect = currency => {
    const selectedCurrency = currencies.find(c => c.code === currency);
    if (!selectedCurrency) return;

    // Handle empty amount case
    const currentAmount = newTransaction.amount || '0'; // Default to '0' if empty

    // Convert the current amount to INR, then to the new currency
    const amountInINR = convertToINR(currentAmount, newTransaction.currency);
    const amountInNewCurrency = convertFromINR(amountInINR, currency);

    // Only update if the amount was valid
    setNewTransaction({
      ...newTransaction,
      currency,
      amount: amountInNewCurrency || '',
    });

    setIsCurrencyDropdownVisible(false);
  };

  // Convert amount to INR based on selected currency
  const convertToINR = (amount, currency) => {
    const parsedAmount = parseFloat(amount || 0); // Handle empty/NaN case
    const selectedCurrency = currencies.find(c => c.code === currency);

    if (!selectedCurrency) {
      console.log('Invalid currency:', currency);
      return parsedAmount;
    }

    return parsedAmount * selectedCurrency.rate;
  };

  // Handle save transaction
  const handleSave = () => {
    const amountInINR = convertToINR(
      newTransaction.amount,
      newTransaction.currency,
    );

    const transactionToSave = {
      ...newTransaction,
      amount: amountInINR,
      currency: 'INR', // Force currency to INR
    };
    onSave(transactionToSave); // Pass the converted transaction to the parent
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

          {/* Category Selection */}
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryLabel}>Category:</Text>
            <CategoryButtons
              selectedCategory={newTransaction.category}
              onSelectCategory={category =>
                setNewTransaction({...newTransaction, category})
              }
            />
          </View>

          {/* Description Input */}
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={newTransaction.description}
            onChangeText={text =>
              setNewTransaction({...newTransaction, description: text})
            }
          />

          {/* Amount Input with Currency Dropdown */}
          <View style={styles.amountContainer}>
            {/* Currency Dropdown */}
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

            {/* Currency Dropdown Options */}
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

            {/* Amount Input */}
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

          {/* Save and Cancel Buttons */}
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.saveButton, !isFormValid && styles.disabledButton]}
              onPress={handleSave} // Use handleSave instead of onSave
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