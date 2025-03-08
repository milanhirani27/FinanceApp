import React, { useState } from 'react';
import { Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import AnimatedLogo from '../../components/AnimatedLogo/AnimatedLogo';
import FormContainer from '../../components/FormContainer/FormContainer';
import styles from './LoginScreen.styles';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const logoScale = useSharedValue(1);

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
      translateY.value = withSpring(-100, { damping: 10 });
      opacity.value = withTiming(0, { duration: 500 });
      navigation.replace('Home', { screen: 'Dashboard' });
    } else {
      setError('Invalid credentials');
      logoScale.value = withSpring(1.1, { damping: 2 }, () => {
        logoScale.value = withSpring(1);
      });
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <AnimatedLogo scale={logoScale} />
          <Animated.View style={[animatedStyle]}>
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
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;