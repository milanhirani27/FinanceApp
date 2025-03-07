import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Icon name="account-circle" size={70} color="#6a11cb" />
        <Text style={styles.profileName}>Admin</Text>
        <Text style={styles.profileEmail}>Admin@example.com</Text>
      </View>

      {/* Profile Options */}
      <View style={styles.optionsContainer}>
        {/* Currency Button */}
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="attach-money" size={24} color="#6200ee" />
          <Text style={styles.optionText}>Currency</Text>
        </TouchableOpacity>

        {/* Settings Button */}
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="settings" size={24} color="#6200ee" />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>

        {/* Notifications Button */}
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="notifications" size={24} color="#6200ee" />
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>

        {/* Help Button */}
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="help-outline" size={24} color="#6200ee" />
          <Text style={styles.optionText}>Help</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Auth')}>
          <Icon name="logout" size={24} color="#ff4444" />
          <Text style={[styles.optionText, { color: '#ff4444' }]}>Logout</Text>
        </TouchableOpacity>
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
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#6200ee',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
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
    color: '#333',
  },
});

export default ProfileScreen;