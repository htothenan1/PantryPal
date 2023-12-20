import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedItem: {
    backgroundColor: '#ff9f67',
    color: 'white',
  },
  selectedItemText: {
    color: 'white',
  },
  itemText: {
    fontSize: 16,
  },
  buttonContainer: {
    margin: 20,
    padding: 10,
  },
  buttonText: {
    fontSize: 25,
    color: '#ff9f67',
    textAlign: 'center',
  },
  subItemsContainer: {
    paddingLeft: 20,
    backgroundColor: '#f8f8f8',
  },
  subItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedSubItem: {
    backgroundColor: '#ffcc99',
  },
  subItemText: {
    fontSize: 14,
    color: '#333',
  },
  selectedSubItemText: {
    color: 'white',
  },
});
