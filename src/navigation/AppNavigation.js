import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';

const Stack = createStackNavigator();

const AppNavigation = () => (
  <Stack.Navigator
    initialRouteName="Auth"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Auth" component={AuthNavigator} />
    <Stack.Screen name="Home" component={HomeNavigator} />
  </Stack.Navigator>
);

export default AppNavigation;