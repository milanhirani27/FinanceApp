import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LogBox} from 'react-native';
import AppNavigation from './navigation/AppNavigation';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}} edges={['top', 'left', 'right']}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
