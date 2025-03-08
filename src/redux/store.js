import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dashboardReducer from './slices/dashboardSlice';
import budgetReducer from './slices/budgetSlice';
import transactionReducer from './slices/transactionSlice'; // Add transaction slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    budget: budgetReducer,
    transaction: transactionReducer, 
  },
});

export default store;