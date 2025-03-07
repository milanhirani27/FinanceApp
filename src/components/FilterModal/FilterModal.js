// src/components/FilterModal/FilterModal.js
import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './FilterModal.styles';

const FilterModal = ({isVisible, onClose, onSelectCategory}) => {
  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Category</Text>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Icon name="close" size={20} color="#6200ee" />
          </TouchableOpacity>
          <ScrollView>
            {['All', 'Food', 'Entertainment', 'Utilities', 'Transport'].map(
              category => (
                <TouchableOpacity
                  key={category}
                  style={styles.modalItem}
                  onPress={() => onSelectCategory(category)}>
                  <Text style={styles.modalItemText}>{category}</Text>
                </TouchableOpacity>
              ),
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
