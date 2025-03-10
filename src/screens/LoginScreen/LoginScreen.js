import React, { useState } from 'react';
import { Text, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import AnimatedLogo from '../../components/AnimatedLogo/AnimatedLogo';
import FormContainer from '../../components/FormContainer/FormContainer';
import { loginSuccess, loginFailure } from '../../redux/slices/authSlice';
import styles from './LoginScreen.styles';
import { useDispatch } from 'react-redux';

const LoginScreen = () => {
  const dispatch = useDispatch();  
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    setUsernameError('');
    setPasswordError('');
    setError('');

    if (!username.trim() && !password.trim()) {
      setUsernameError('Username is required');
      setPasswordError('Password is required');
      return;
    }

    if (!username.trim()) {
      setUsernameError('Username is required');
      return;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    }

    if (username.toLowerCase() === 'admin' && password === '123') {
      setError('');
      dispatch(loginSuccess({ username }));
      navigation.replace('Home', { screen: 'Dashboard' });
    } else {
      setError('Invalid credentials');
      dispatch(loginFailure('Invalid credentials'));
    }
  };

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <AnimatedLogo />
          <View>
            <FormContainer title="Login" subtitle="Please sign in to continue">
              <InputField
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
                iconName="account"
                error={usernameError}
              />
              <InputField
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                iconName="lock"
                error={passwordError}
              />
              {error && <Text style={styles.errorText}>{error}</Text>}
              <Button title="Login" onPress={handleLogin} />
              <Text style={styles.footerText}>
                Don't have an account? <Text style={styles.footerLink}>Sign up</Text>
              </Text>
            </FormContainer>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;