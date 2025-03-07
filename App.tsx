import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context'; // Import SafeAreaProvider
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './src/navigation/AuthNavigator';
import HomeNavigator from './src/navigation/HomeNavigator';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{flex : 1}} edges={['top', 'left', 'right']}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Auth"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="Home" component={HomeNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
