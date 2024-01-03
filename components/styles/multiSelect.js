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
});
