// src/components/CategoryButtons/CategoryButtons.js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './CategoryButtons.styles';

const CategoryButtons = ({ selectedCategory, onSelectCategory }) => {
  const categories = ['Food', 'Entertainment', 'Utilities', 'Transport'];

  return (
    <View style={styles.categoryButtons}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.selectedCategoryButton,
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Text
            style={[
              styles.categoryButtonText,
              selectedCategory === category && styles.selectedCategoryText,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryButtons;