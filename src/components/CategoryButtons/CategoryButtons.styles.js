import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    padding: 8,
    margin: 4,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#6200ee',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#000',
  },
  selectedCategoryText: {
    color: '#fff',
  },
});

export default styles;