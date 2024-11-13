import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewStyle: {
    marginVertical: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginRight: 20,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F2F2F2',
    marginRight: 8,
  },
  selectedTab: {
    backgroundColor: '#D8D8D8',
    borderRadius: 12,
  },
  tabText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Avenir-Book',
  },
  selectedTabText: {
    color: '#333',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
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
    flex: 1,
  },
  itemImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  itemExpInt: {
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
  whiteText: {
    color: 'white',
  },
});
