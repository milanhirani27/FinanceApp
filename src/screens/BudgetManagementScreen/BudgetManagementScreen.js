import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BudgetItem from '../../components/BudgetItem/BudgetItem';
import BudgetModal from '../../components/BudgetModal/BudgetModal';
import AddButton from '../../components/AddButton/AddButton';
import styles from './BudgetManagementScreen.styles';
import { addBudget, editBudget, deleteBudget } from '../../redux/slices/budgetSlice';

const BudgetManagementScreen = () => {
  const dispatch = useDispatch();
  const budgets = useSelector((state) => state.budget.budgets);

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
      dispatch(
        addBudget({
          category,
          budget: parseFloat(budgetAmount),
        })
      );
    } else if (modalType === 'edit' && selectedBudget) {
      dispatch(
        editBudget({
          id: selectedBudget.id,
          category,
          budget: parseFloat(budgetAmount),
          spent: parseFloat(spentAmount),
        })
      );
    }
    closeModal();
  };

  const handleDeleteBudget = (id) => {
    Alert.alert(
      'Delete Budget',
      'Are you sure you want to delete this budget?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => dispatch(deleteBudget(id)) },
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
            onDelete={() => handleDeleteBudget(item.id)}
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