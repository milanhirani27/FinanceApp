import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardScreen from '../screens/DashboardScreen/DashboardScreen';
import TransactionManagementScreen from '../screens/TransactionManagementScreen/TransactionManagementScreen';
import BudgetManagementScreen from '../screens/BudgetManagementScreen/BudgetManagementScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
          } else if (route.name === 'Transactions') {
            iconName = focused ? 'cash-multiple' : 'cash-multiple';
          } else if (route.name === 'Budget') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline'; 
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
        animation: 'shift' 
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Transactions" component={TransactionManagementScreen} />
      <Tab.Screen name="Budget" component={BudgetManagementScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeNavigator;