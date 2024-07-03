import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window'); // Get the screen height

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    marginTop: 50,
  },
  contentContainer: {
    paddingBottom: 120, // Adjust padding as needed
  },
  accountInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  accountImage: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
  },
  accountImageDefault: {
    marginTop: 10,
  },
  titleContainer: {
    justifyContent: 'center',
    marginLeft: 8,
    flex: 1,
  },
  modalTitleText: {
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 10,
    backgroundColor: '#e5e5e5',
  },
  titleText: {
    textAlign: 'left',
    fontSize: 20,
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
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#1b4965',
    borderRadius: 10,
    marginBottom: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
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
    fontSize: 16,
    fontFamily: 'Avenir-Book',
    marginVertical: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: height * 0.5,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
  modalItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalItemImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  itemTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 20,
    fontFamily: 'Avenir-Book',
  },
  startButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#1b4965',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
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
  },
});
