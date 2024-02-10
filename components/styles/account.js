import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window'); // Get the screen height

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: 10,
  },
  titleText: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
    marginVertical: 10,
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
  buttonContainer: {
    alignSelf: 'center',
  },
  headerText: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
    // marginVertical: 20,
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
});
