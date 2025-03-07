import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
      color: '#6200ee',
    },
    modalCloseButton: {
      position: 'absolute',
      top: 16,
      right: 16,
    },
    categoryContainer: {
      marginBottom: 16,
    },
    categoryLabel: {
      fontSize: 16,
      color: '#6200ee',
      marginBottom: 8,
    },
    input: {
      marginBottom: 16,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
    },
    amountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    currencyDropdownButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#eee',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginRight: 8,
    },
    currencyDropdownText: {
      fontSize: 16,
      color: '#6200ee',
      marginRight: 8,
    },
    currencyDropdownOptions: {
      position: 'absolute',
      top: 50,
      left: 0,
      backgroundColor: '#fff',
      borderRadius: 8,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      zIndex: 1,
      width: '40%', // Adjust width as needed
    },
    currencyOption: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    currencyOptionText: {
      fontSize: 16,
      color: '#6200ee',
    },
    amountInput: {
      flex: 1,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    saveButton: {
      flex: 1,
      marginRight: 8,
      backgroundColor: '#6200ee',
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
    },
    disabledButton: {
      backgroundColor: '#ccc',
    },
    cancelButton: {
      flex: 1,
      marginLeft: 8,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#6200ee',
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    cancelButtonText: {
      color: '#6200ee',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
  
  export default styles;