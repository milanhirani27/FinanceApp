import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  budgets: [
    { id: 1, category: 'Food', budget: 5000, spent: 3000 },
    { id: 2, category: 'Entertainment', budget: 2000, spent: 1500 },
    { id: 3, category: 'Utilities', budget: 3000, spent: 2500 },
  ],
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    addBudget(state, action) {
      const newBudget = {
        id: state.budgets.length + 1,
        category: action.payload.category,
        budget: action.payload.budget,
        spent: 0,
      };
      state.budgets.push(newBudget);
    },
    editBudget(state, action) {
      const { id, category, budget, spent } = action.payload;
      const budgetToEdit = state.budgets.find((budget) => budget.id === id);
      if (budgetToEdit) {
        budgetToEdit.category = category;
        budgetToEdit.budget = budget;
        budgetToEdit.spent = spent;
      }
    },
    deleteBudget(state, action) {
      state.budgets = state.budgets.filter(
        (budget) => budget.id !== action.payload
      );
    },
  },
});

export const { addBudget, editBudget, deleteBudget } = budgetSlice.actions;

export default budgetSlice.reducer;