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
    width: 150,
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
  chefFab: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
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
    position: 'absolute',
    top: '15%',
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
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  emptyStateText: {
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    lineHeight: 55,
    color: '#666',
  },
  scrollViewStyle: {
    marginHorizontal: 24,
    marginVertical: 10,
  },

  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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

  button: {
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderBottomWidth: 0.2,
    marginTop: 50,
  },
  userIcon: {
    width: 55,
    height: 55,
    borderRadius: 25,
    // borderWidth: 0.4,
  },
  userName: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
  },
  levelText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'Avenir-Book',
  },
  progressContainer: {
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderBottomWidth: 0.2,
  },
  progressTitle: {
    fontFamily: 'Avenir-Book',
    fontSize: 16,
    color: '#000',
  },
  progressBar: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  progressText: {
    textAlign: 'left',
    fontSize: 16,
    color: '#000',
    fontFamily: 'Avenir-Book',
  },
  actionItemContainer: {
    flexDirection: 'row', // Align children horizontally.
    alignItems: 'center', // Center children vertically in the cross axis.
    marginBottom: 10, // Add some space between each item.
  },

  actionItemText: {
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    lineHeight: 55,
    color: '#666',
    marginLeft: 10, // Add some space between the icon and the text.
  },
  saveText: {
    fontFamily: 'Avenir-Book',
    fontSize: 14,
    color: 'black',
  },
  loadingText: {
    fontFamily: 'Avenir-Book',
    fontSize: 30,
    color: 'black',
  },
});
