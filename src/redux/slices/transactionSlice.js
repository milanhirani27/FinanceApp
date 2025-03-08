import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [
    {
      id: 1,
      date: '2025-03-07',
      amount: 500,
      currency: 'INR',
      category: 'Food',
      description: 'Lunch at Cafe',
    },
    {
      id: 2,
      date: '2025-03-07',
      amount: 300,
      currency: 'INR',
      category: 'Entertainment',
      description: 'Movie tickets',
    },
    {
      id: 3,
      date: '2025-03-07',
      amount: 700,
      currency: 'INR',
      category: 'Utilities',
      description: 'Electricity bill',
    },
    {
      id: 4,
      date: '2025-03-07',
      amount: 300,
      currency: 'INR',
      category: 'Entertainment',
      description: 'Movie tickets',
    },
    {
      id: 5,
      date: '2025-03-07',
      amount: 300,
      currency: 'INR',
      category: 'Entertainment',
      description: 'Movie tickets',
    },
  ],
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addTransaction(state, action) {
      const newTransaction = {
        id: state.transactions.length + 1,
        ...action.payload,
      };
      state.transactions.push(newTransaction);
    },
    editTransaction(state, action) {
      const { id, ...updatedFields } = action.payload;
      const transactionToEdit = state.transactions.find(
        (transaction) => transaction.id === id
      );
      if (transactionToEdit) {
        Object.assign(transactionToEdit, updatedFields);
      }
    },
    deleteTransaction(state, action) {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
  },
});

export const { addTransaction, editTransaction, deleteTransaction } =
  transactionSlice.actions;

export default transactionSlice.reducer;