// src/components/AddEditBudgetModal/AddEditBudgetModal.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import styles from './BudgetModal.styles';

const BudgetModal = ({
  isVisible,
  onClose,
  modalType,
  category,
  setCategory,
  budgetAmount,
  setBudgetAmount,
  spentAmount,
  setSpentAmount,
  onSave,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{modalType === 'add' ? 'Add Budget' : 'Edit Budget'}</Text>

          {/* Category Field */}
          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter category"
            value={category}
            onChangeText={setCategory}
          />

          {/* Budget Amount Field */}
          <Text style={styles.label}>Budget Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter budget amount"
            value={budgetAmount}
            onChangeText={setBudgetAmount}
            keyboardType="numeric"
          />

          {/* Spent Amount Field (Only for Edit Mode) */}
          {modalType === 'edit' && (
            <>
              <Text style={styles.label}>Spent Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter spent amount"
                value={spentAmount}
                onChangeText={setSpentAmount}
                keyboardType="numeric"
              />
            </>
          )}

          {/* Modal Buttons */}
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
              <Text style={styles.buttonText}>Save</Text>
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

export default BudgetModal;