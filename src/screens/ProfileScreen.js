import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  const navigation = useNavigation();

  // Profile data
  const profile = {
    name: 'Admin',
    email: 'Admin@example.com',
    icon: { name: 'account-circle', size: 70, color: '#6a11cb' },
  };

  // Profile options
  const options = [
    { id: 1, icon: 'attach-money', text: 'Currency', color: '#6200ee' },
    { id: 2, icon: 'settings', text: 'Settings', color: '#6200ee' },
    { id: 3, icon: 'notifications', text: 'Notifications', color: '#6200ee' },
    { id: 4, icon: 'help-outline', text: 'Help', color: '#6200ee' },
    {
      id: 5,
      icon: 'logout',
      text: 'Logout',
      color: '#ff4444',
      onPress: () => navigation.navigate('Auth'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Icon {...profile.icon} />
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileEmail}>{profile.email}</Text>
      </View>

      {/* Profile Options */}
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionButton}
            onPress={option.onPress}
          >
            <Icon name={option.icon} size={24} color={option.color} />
            <Text style={[styles.optionText, { color: option.color }]}>
              {option.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  optionsContainer: {
    marginTop: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 16,
  },
});

export default ProfileScreen;