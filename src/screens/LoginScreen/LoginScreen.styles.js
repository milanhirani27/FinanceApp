import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  footerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
  footerLink: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
});

export default styles;