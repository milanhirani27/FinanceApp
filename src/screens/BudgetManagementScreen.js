// src/screens/BudgetManagementScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BudgetItem from '../components/BudgetItem/BudgetItem';
import BudgetModal from '../components/BudgetModal/BudgetModal';

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
      const utilization = item.spent / item.budget;
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

  return (
    <View style={styles.container}>
      {/* Budget List */}
      <FlatList
        data={budgets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BudgetItem
            item={item}
            onEdit={() => openModal('edit', item)}
            onDelete={deleteBudget}
          />
        )}
        contentContainerStyle={styles.budgetList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No budgets set.</Text>
        }
      />

      {/* Add Budget Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => openModal('add')}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Add/Edit Budget Modal */}
      <BudgetModal
        isVisible={isModalVisible}
        onClose={closeModal}
        modalType={modalType}
        category={category}
        setCategory={setCategory}
        budgetAmount={budgetAmount}
        setBudgetAmount={setBudgetAmount}
        spentAmount={spentAmount}
        setSpentAmount={setSpentAmount}
        onSave={saveBudget}
      />
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
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 24,
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
});

export default BudgetManagementScreen;