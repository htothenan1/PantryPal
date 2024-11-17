import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    marginTop: 50,
  },
  loadingContainer: {marginTop: 250},
  contentContainer: {
    paddingBottom: 120,
  },
  accountInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  accountImage: {
    width: 80,
    height: 80,
    marginLeft: 10,
  },
  accountImageDefault: {
    width: 80,
    height: 80,
  },
  titleContainer: {
    justifyContent: 'center',
    marginLeft: 8,
    flex: 1,
  },
  chooseFlavrButton: {
    padding: 5,
    backgroundColor: '#1b4965',
    borderRadius: 10,
    width: 100,
  },
  chooseFlavrButtonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
  },
  titleText: {
    textAlign: 'left',
    fontSize: 25,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
  },
  levelText: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
  },
  headerIcon: {
    marginLeft: 10,
  },
  pantryButton: {
    padding: 14,
    backgroundColor: '#1b4965',
    borderRadius: 10,
    marginVertical: 15,
  },
  favoriteRecipesButton: {
    padding: 14,
    backgroundColor: '#1b4965',
    borderRadius: 10,
    marginVertical: 15,
  },
  compostGameButton: {
    padding: 14,
    backgroundColor: '#1b4965',
    borderRadius: 10,
    marginVertical: 15,
  },
  compostGameText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
  },
  pantryButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
  },
  headerText: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
  },
  itemsList: {
    marginTop: 10,
  },
  item: {
    textAlign: 'left',
    fontFamily: 'Avenir-Book',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalTitleText: {
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 10,
    backgroundColor: '#e5e5e5',
    marginBottom: 10,
  },
  modalContent: {
    height: height * 0.5,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  modalItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalItemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  modalItemText: {
    fontSize: 18,
    fontFamily: 'Avenir-Book',
  },
  togglesContainer: {
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  toggleLabel: {
    fontSize: 16,
    fontFamily: 'Avenir-Book',
  },
  preferencesContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
  },
  preferencesTitle: {
    fontSize: 18,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chartContainer: {
    marginVertical: 8,
    borderRadius: 16,
    padding: 16,
    backgroundColor: 'white',
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  itemIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Avenir-Book',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Avenir-Book',
  },
  reasonText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
    fontFamily: 'Avenir-Book',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Avenir-Book',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 15,
    color: '#7F7F7F',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  paginationText: {
    fontSize: 14,
    color: '#1b4965',
    fontFamily: 'Avenir-Book',
  },
  logoutButton: {
    padding: 14,
    backgroundColor: '#1b4965',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 50,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
  },
  deleteAccountButton: {
    marginTop: 10,
    backgroundColor: '#B22222', // Red color for warning
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteAccountButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
  },
});
