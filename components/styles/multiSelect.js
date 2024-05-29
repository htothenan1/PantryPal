import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  selectedTab: {
    backgroundColor: '#1b4965',
    borderRadius: 10,
  },
  tabText: {
    fontSize: 13,
  },
  selectedTabText: {
    color: 'white',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedItem: {
    backgroundColor: '#5fa8d3',
    color: 'white',
  },
  selectedItemText: {
    color: 'white',
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Avenir-Book',
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 25,
    color: '#5fa8d3',
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
    backgroundColor: '#5fa8d3',
  },
  subItemText: {
    fontSize: 14,
    color: '#333',
  },
  selectedSubItemText: {
    color: 'white',
  },
  selectedWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  counterText: {
    alignSelf: 'center', // Adjust this as needed
    fontSize: 16, // Adjust font size as needed
    color: '#000', // Adjust text color as needed
    fontFamily: 'Avenir-Book',
  },
  disabledButton: {
    backgroundColor: '#ccc', // A light grey to indicate the button is disabled
  },
  button: {
    padding: 10, // Adjust padding as needed
    borderRadius: 5, // Adjust border radius as needed
    // Ensure you have backgroundColor set for when the button is enabled
  },
});
