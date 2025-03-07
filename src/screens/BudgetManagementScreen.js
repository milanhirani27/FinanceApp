import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as Progress from 'react-native-progress';

const BudgetManagementScreen = () => {
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Food', budget: 5000, spent: 3000 },
    { id: 2, category: 'Entertainment', budget: 2000, spent: 1500 },
    { id: 3, category: 'Utilities', budget: 3000, spent: 2500 },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [category, setCategory] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [spentAmount, setSpentAmount] = useState('');
  const [alertShown, setAlertShown] = useState({});

  // Track budget utilization alerts
  useEffect(() => {
    budgets.forEach((item) => {
      const utilization = calculateUtilization(item.budget, item.spent);
      const isExceeding = utilization >= 1;
      const isApproaching = utilization >= 0.8;

      if (isExceeding && !alertShown[item.id]) {
        Alert.alert(`You have exceeded your ${item.category} budget!`);
        setAlertShown((prev) => ({ ...prev, [item.id]: true }));
      } else if (isApproaching && !alertShown[item.id]) {
        Alert.alert(`You are approaching your ${item.category} budget!`);
        setAlertShown((prev) => ({ ...prev, [item.id]: true }));
      }
    });
  }, [budgets]);

  // Open Modal
  const openModal = (type, budget = null) => {
    setModalType(type);
    if (type === 'edit' && budget) {
      setSelectedBudget(budget);
      setCategory(budget.category);
      setBudgetAmount(budget.budget.toString());
      setSpentAmount(budget.spent.toString());
    } else {
      setCategory('');
      setBudgetAmount('');
      setSpentAmount('');
    }
    setIsModalVisible(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedBudget(null);
    setCategory('');
    setBudgetAmount('');
    setSpentAmount('');
  };

  // Save Budget
  const saveBudget = () => {
    if (!category || !budgetAmount || (modalType === 'edit' && !spentAmount)) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    if (modalType === 'add') {
      const newBudgetItem = {
        id: budgets.length + 1,
        category,
        budget: parseFloat(budgetAmount),
        spent: 0,
      };
      setBudgets([...budgets, newBudgetItem]);
    } else if (modalType === 'edit' && selectedBudget) {
      const updatedBudgets = budgets.map((budget) =>
        budget.id === selectedBudget.id
          ? {
              ...budget,
              category,
              budget: parseFloat(budgetAmount),
              spent: parseFloat(spentAmount),
            }
          : budget
      );
      setBudgets(updatedBudgets);
    }
    closeModal();
  };

  // Delete Budget
  const deleteBudget = (id) => {
    Alert.alert(
      'Delete Budget',
      'Are you sure you want to delete this budget?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => setBudgets(budgets.filter((budget) => budget.id !== id)) },
      ]
    );
  };

  // Calculate Budget Utilization
  const calculateUtilization = (budget, spent) => {
    return spent / budget;
  };

  // Render Budget Item
  const renderBudgetItem = ({ item }) => {
    const utilization = calculateUtilization(item.budget, item.spent);
    const isExceeding = utilization >= 1;
    const isApproaching = utilization >= 0.8;

    return (
      <Animated.View entering={FadeIn} exiting={FadeOut}>
        <View style={styles.budgetCard}>
          <View style={styles.budgetHeader}>
            <Text style={styles.budgetCategory}>{item.category}</Text>
            <Text style={styles.budgetAmount}>₹{item.spent} / ₹{item.budget}</Text>
          </View>
          <Progress.Bar
            progress={utilization}
            width={null}
            height={10}
            color={isExceeding ? '#ff4444' : isApproaching ? '#ffbb33' : '#00C851'}
            style={styles.progressBar}
          />
          <View style={styles.budgetActions}>
            <TouchableOpacity onPress={() => openModal('edit', item)} style={styles.actionButton}>
              <Icon name="pencil" size={20} color="#6200ee" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteBudget(item.id)} style={styles.actionButton}>
              <Icon name="delete" size={20} color="#ff4444" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Budget List */}
      <FlatList
        data={budgets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBudgetItem}
        contentContainerStyle={styles.budgetList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No budgets set.</Text>
        }
      />

      {/* Add Budget Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => openModal('add')}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Reusable Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
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
              <TouchableOpacity style={styles.saveButton} onPress={saveBudget}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
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
  budgetList: {
    paddingBottom: 16,
  },
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
  progressBar: {
    marginVertical: 8,
  },
  budgetActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    marginLeft: 16,
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
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
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
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
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
});

export default BudgetManagementScreen;