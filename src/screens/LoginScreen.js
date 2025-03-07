import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

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
    navigation.replace('Home', { screen: 'Dashboard' });

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

  const handleUsernameChange = (text) => {
    setUsername(text);
    if (usernameError) setUsernameError('');
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (passwordError) setPasswordError('');
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }],
    };
  });

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
            <Icon name="account-circle" size={70} color="#fff" />
            <Text style={styles.logoText}>Welcome</Text>
          </Animated.View>
          <Animated.View style={[styles.formContainer, animatedStyle]}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Please sign in to continue</Text>
            <View style={styles.inputContainer}>
              <Icon name="account" size={20} color="#6200ee" style={styles.inputIcon} />
              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={handleUsernameChange}
                style={styles.input}
                placeholderTextColor="#666"
              />
            </View>
            {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="#6200ee" style={styles.inputIcon} />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#666"
              />
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text style={styles.footerLink}>Sign up</Text>
            </Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection:'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    paddingLeft: 10,
  },
  formContainer: {
    width: width * 0.9,
    padding: 25,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#6200ee',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#6200ee',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 8,
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  footerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
  footerLink: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
});

export default LoginScreen;