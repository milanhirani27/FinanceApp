import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryButtons from '../CategoryButtons/CategoryButtons';
import styles from './TransactionModal.styles';

const TransactionModal = ({
  isVisible,
  onClose,
  isAddModal,
  newTransaction,
  setNewTransaction,
  onSave,
  isFormValid,
}) => {
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
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={newTransaction.amount}
            onChangeText={text =>
              setNewTransaction({
                ...newTransaction,
                amount: text.replace(/[^0-9]/g, ''),
              })
            }
            keyboardType="numeric"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.saveButton, !isFormValid && styles.disabledButton]}
              onPress={onSave}
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