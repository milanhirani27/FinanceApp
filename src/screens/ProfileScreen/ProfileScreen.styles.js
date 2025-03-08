import { StyleSheet } from "react-native";

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

  export default styles;