// src/components/SearchFilterBar/SearchFilterBar.js
import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './SearchFilterBar.styles';

const SearchFilterBar = ({ searchQuery, setSearchQuery, filterCategory, onFilterPress }) => {
  return (
    <View style={styles.searchFilterContainer}>
      <View style={styles.searchBarContainer}>
        <Icon name="magnify" size={20} color="#6200ee" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search transactions"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.searchCloseButton}>
            <Icon name="close" size={20} color="#6200ee" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <Icon name="filter" size={20} color="#6200ee" />
        <Text style={styles.filterText}>{filterCategory}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchFilterBar;