import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingScreenIcon: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingScreenSpinner: {
    marginVertical: 10,
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
    backgroundColor: '#f8f9fa',
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
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  fabButton: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b4965',
    borderRadius: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  fabButtonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Avenir-Book',
  },
  emptyFab: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b4965',
    borderRadius: 28,
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
  categoriesContainer: {
    margin: 0,
    padding: 0,
    height: 50,
    paddingBottom: 0,
  },
  emptyStateContainer: {
    marginTop: 20,
    marginBottom: 80,
  },
  emptyStateContentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  emptyStateChefLogo: {
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusOne: {fontSize: 16, color: 'white'},
  scrollViewStyle: {
    marginHorizontal: 24,
    marginVertical: 10,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
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
    fontSize: 13,
    color: '#333',
    fontFamily: 'Avenir-Book',
  },
  selectedTabText: {
    color: '#333',
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  actionItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionItemText: {
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    lineHeight: 55,
    color: '#666',
    marginLeft: 10,
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
  singleAddItemContainer: {
    alignItems: 'left',
    padding: 100,
  },
  cancelButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  singleAddItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  singleAddItemList: {
    maxHeight: 250,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  singleAddItemIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
});
