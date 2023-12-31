import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 50,
  },
  titleText: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
    marginVertical: 20,
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
  info: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Avenir-Book',
    marginVertical: 4,
    // paddingHorizontal: 10,
  },
  sectionHeader: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  itemsList: {
    marginTop: 10,
  },
  item: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Avenir-Book',
    marginVertical: 4,
    // paddingHorizontal: 10,
  },
});
