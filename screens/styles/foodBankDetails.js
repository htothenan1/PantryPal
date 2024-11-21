import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  phone: {
    fontSize: 16,
    marginBottom: 5,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  link: {
    fontSize: 16,
    color: 'green',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
