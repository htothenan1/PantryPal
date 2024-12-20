import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 45,
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
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 28,
  },
  headerIcon: {
    marginHorizontal: 10,
    marginTop: 16,
  },
  rightSwipeContainer: {
    flexDirection: 'row',
    width: 120,
    justifyContent: 'space-between',
  },
  swipeButton: {
    width: 60,
    backgroundColor: '#dee2e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxInput: {
    height: 50,
    width: 170,
    marginLeft: 24,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  boxButton: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 5,
    marginRight: 24,
    marginTop: 20,
    width: 145,
  },
  whiteText: {
    color: 'white',
  },
  selectedWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  itemsList: {
    marginBottom: 75,
  },
  item: {
    borderWidth: 0.2,
    borderColor: '#ddd',
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 12,
  },
  itemText: {
    fontSize: 18,
    fontFamily: 'Avenir-Book',
  },
  remainingDaysText: {
    fontSize: 16,
    fontFamily: 'Avenir-Book',
  },
  itemImage: {
    width: 50,
    height: '100%',
    resizeMode: 'contain',
  },
  fabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  fabButton: {
    flex: 1,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b4965',
  },
  fabButtonText: {
    fontSize: 18,
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
    fontSize: 15,
    color: '#333',
    fontFamily: 'Avenir-Book',
  },
  selectedTabText: {
    color: '#333',
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
  modalContent: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 30,
    position: 'absolute',
    top: '15%',
    left: 0,
    right: 0,
  },
  modalHeader: {
    marginVertical: 10,
    fontFamily: 'Avenir-Book',
    fontSize: 24,
    marginLeft: 10,
  },
  reviewOptions: {
    marginVertical: 4,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 15,
    width: '100%',
  },
  optionText: {
    fontFamily: 'Avenir-Book',
    fontSize: 17,
    color: 'black',
    marginLeft: 10,
  },
});
