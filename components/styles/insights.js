import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleText: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  item: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Avenir-Book',
    marginVertical: 4,
  },
  itemsList: {
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  headerIcon: {
    marginLeft: 10,
  },
  buttonContainer: {
    alignSelf: 'center',
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
});
