import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemsLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  rightSwipeContainer: {
    flexDirection: 'row',
    width: 180,
    justifyContent: 'space-between',
  },
  swipeButton: {
    width: 60,
    backgroundColor: '#dee2e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: 100,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  itemsList: {
    marginBottom: 80,
  },
  item: {
    borderWidth: 0.2,
    paddingHorizontal: 25,
    paddingVertical: 14,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
    height: 50,
  },
  itemText: {
    fontSize: 20,
    fontFamily: 'Avenir-Book',
  },
  itemImage: {
    width: 50,
    height: '100%',
    resizeMode: 'contain',
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 10,
    backgroundColor: '#1b4965',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  emptyFab: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b4965',
    borderRadius: 28,
  },
  leftFab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
    bottom: 10,
    backgroundColor: '#1b4965',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  centerFab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    left: '50%',
    marginLeft: -28,
    bottom: 10,
    backgroundColor: '#1b4965',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 20,
    position: 'absolute', // Use absolute positioning to place the modal
    top: '15%', // Adjust this to move the modal higher, 25% from the top
    left: 0,
    right: 0,
  },
  modalHeader: {
    marginVertical: 10,
    fontFamily: 'Avenir-Book',
    fontSize: 20,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyStateText: {
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    lineHeight: 55,
    textAlign: 'center',
    color: '#666',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginBottom: 5,
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
  button: {
    padding: 10, // Adjust padding as needed
    borderRadius: 5, // Adjust border radius as needed
    // Ensure you have backgroundColor set for when the button is enabled
  },
  disabledButton: {
    backgroundColor: '#ccc', // A light grey to indicate the button is disabled
  },
});
