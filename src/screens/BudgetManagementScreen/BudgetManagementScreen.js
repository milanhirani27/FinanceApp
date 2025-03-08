// src/screens/BudgetManagementScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, Text, TouchableOpacity } from 'react-native';
import BudgetItem from '../../components/BudgetItem/BudgetItem';
import BudgetModal from '../../components/BudgetModal/BudgetModal';
import AddButton from '../../components/AddButton/AddButton';
import styles from './BudgetManagementScreen.styles';
import { budgetData } from '../../constants/BudgetManagementData';

const BudgetManagementScreen = () => {
  const [budgets, setBudgets] = useState(budgetData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [category, setCategory] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [spentAmount, setSpentAmount] = useState('');
  const [alertShown, setAlertShown] = useState({});

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

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedBudget(null);
    setCategory('');
    setBudgetAmount('');
    setSpentAmount('');
  };

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
      <AddButton onPress={() => openModal('add')} />
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

export default BudgetManagementScreen;