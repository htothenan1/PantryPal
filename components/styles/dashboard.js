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
    justifyContent: 'flex-start',
    paddingLeft: 28,
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
    marginBottom: 75,
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
  remainingDaysText: {
    fontSize: 20,
    fontFamily: 'Avenir-Book',
  },
  itemImage: {
    width: 50,
    height: '100%',
    resizeMode: 'contain',
  },
  fabContainer: {
    borderTopWidth: 0.3,
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
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 4,
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
    // textAlign: 'center',
    color: '#666',
  },
  scrollViewStyle: {
    marginHorizontal: 24,
    marginVertical: 10,
  },

  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Ensure this doesn't contribute to the height
    // Remove paddingVertical if it's creating extra space
    // padding: 10,
    margin: 0,
  },

  tab: {
    justifyContent: 'center', // Center the text horizontally within the tab
    alignItems: 'center', // Center the text vertically within the tab
    paddingVertical: 0, // Reduce the vertical padding inside each tab
    paddingHorizontal: 12, // Horizontal padding inside each tab
    borderRadius: 20, // Rounded corners
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    marginRight: 4, // Space between tabs
    // Other styles...
  },

  // ... other styles remain the same

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

  button: {
    padding: 10, // Adjust padding as needed
    borderRadius: 5, // Adjust border radius as needed
    // Ensure you have backgroundColor set for when the button is enabled
  },
  disabledButton: {
    backgroundColor: '#ccc', // A light grey to indicate the button is disabled
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderBottomWidth: 0.2,
    // backgroundColor: '#f8f9fa',
    // Add other styling as necessary
  },
  userIcon: {
    width: 50, // Set the width as you like
    height: 50, // Set the height as you like
    borderRadius: 25, // This will make it round, adjust as necessary
    borderWidth: 0.4,
    // Add other styling as necessary
  },
  userName: {
    marginLeft: 10, // Adjust the spacing between the icon and the name as necessary
    fontSize: 18, // Adjust the font size as necessary
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
    // Add other styling as necessary
  },
  levelText: {
    marginLeft: 10, // Adjust the spacing between the icon and the name as necessary
    fontSize: 18, // Adjust the font size as necessary
    fontWeight: 800,
    fontFamily: 'Avenir-Book',
    // Add other styling as necessary
  },
  progressContainer: {
    // Styles for the progress bar container
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderBottomWidth: 0.2,
  },
  progressTitle: {
    fontFamily: 'Avenir-Book',
    fontSize: 16,
    color: '#000', // Choose your color
    // Align and padding as needed
  },
  progressBar: {
    alignSelf: 'stretch', // Ensures the bar stretches to the container width
    marginVertical: 10, // Adjust as necessary
    // Other styling as necessary
  },
  progressText: {
    textAlign: 'left', // Centers the text
    fontSize: 16,
    color: '#000', // Choose your color
    fontFamily: 'Avenir-Book',
    // Any other styling you need
  },
});
