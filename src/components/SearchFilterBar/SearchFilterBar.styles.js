// src/components/SearchFilterBar/SearchFilterBar.styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
  },
  searchCloseButton: {
    marginLeft: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 8,
  },
  filterText: {
    marginLeft: 8,
    color: '#6200ee',
    fontSize: 16,
  },
});

export default styles;