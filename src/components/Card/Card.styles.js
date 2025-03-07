// src/components/Card/Card.styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 8,
  },
});

export default styles;