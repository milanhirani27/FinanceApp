import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {profileData} from '../../constants/ProfileData';
import styles from './ProfileScreen.styles';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const options = [
    {id: 1, icon: 'attach-money', text: 'Currency  [ INR ]', color: '#6200ee'},
    {id: 2, icon: 'settings', text: 'Settings', color: '#6200ee'},
    {id: 3, icon: 'notifications', text: 'Notifications', color: '#6200ee'},
    {id: 4, icon: 'help-outline', text: 'Help', color: '#6200ee'},
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
      <View style={styles.profileHeader}>
        <Icon {...profileData.icon} />
        <Text style={styles.profileName}>{profileData.name}</Text>
        <Text style={styles.profileEmail}>{profileData.email}</Text>
      </View>
      <View style={styles.optionsContainer}>
        {options.map(option => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionButton}
            onPress={option.onPress}>
            <Icon name={option.icon} size={24} color={option.color} />
            <Text style={[styles.optionText, {color: option.color}]}>
              {option.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ProfileScreen;