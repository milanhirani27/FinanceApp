import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './navigation/AuthNavigator';
import HomeNavigator from './navigation/HomeNavigator';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
