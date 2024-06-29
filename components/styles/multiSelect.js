import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewStyle: {
    marginVertical: 10,
  },
  listContentContainer: {
    paddingBottom: 75,
  },
  tabsContainer: {
    flexDirection: 'row',
    margin: 0,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    marginRight: 4,
  },
  selectedTab: {
    backgroundColor: '#1b4965',
    borderRadius: 20,
    borderColor: '#1b4965',
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'white',
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
    alignSelf: 'center',
    fontSize: 16,
    color: '#000',
    fontFamily: 'Avenir-Book',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  saveText: {
    fontFamily: 'Avenir-Book',
    fontSize: 14,
    color: 'black',
  },
});
