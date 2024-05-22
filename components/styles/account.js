import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window'); // Get the screen height

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    marginTop: 50,
  },
  accountInfoWrapper: {
    flexDirection: 'row',
    marginTop: 30
  },
  accountImage: {
    width: 100,
    height: 100,
    resizeMode: 'stretch'
    },
  titleContainer: {
    justifyContent: 'center',
    marginLeft: 8,
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
    justifyContent: 'left',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 10,
  },
  logout: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    padding: 5,
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
  recipesList: {
    height: 100,
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
    borderRadius: 10, // Adjust for more or less rounded corners
    marginHorizontal: 50, // Adds some margin on the sides
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Avenir-Book', // or any preferred font
  },
});
