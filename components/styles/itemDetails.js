import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  background: {
    width: 120,
    height: 120,
    margin: 10,
  },
  headerText: {
    flex: 1,
    textAlign: 'left',
    fontSize: 32,
    marginVertical: 10,
    fontFamily: 'Avenir-Book',
  },
  storageTipText: {
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    paddingHorizontal: 30,
  },
  compatibleHeader: {
    fontWeight: 'bold',
    fontFamily: 'Avenir-Book',
    paddingHorizontal: 30,
    fontSize: 20,
    marginTop: 20,
  },
  compatibleItem: {
    paddingHorizontal: 30,
    fontFamily: 'Avenir-Book',
    fontSize: 20,
    marginVertical: 5,
  },
  techniquesHeader: {
    fontWeight: 'bold',
    fontFamily: 'Avenir-Book',
    paddingHorizontal: 30,
    fontSize: 20,
    marginTop: 20,
  },
  techniquesText: {
    paddingHorizontal: 30,
    fontFamily: 'Avenir-Book',
    fontSize: 20,
    marginVertical: 5,
    color: 'black',
  },
});
