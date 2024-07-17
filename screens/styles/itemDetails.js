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
    width: 110,
    height: 110,
    marginHorizontal: 10,
  },
  headerText: {
    flex: 1,
    textAlign: 'left',
    fontSize: 26,
    // fontWeight: 'bold',
    marginVertical: 10,
    fontFamily: 'Avenir-Book',
  },
  storageTipText: {
    fontSize: 16,
    fontFamily: 'Avenir-Book',
    paddingHorizontal: 30,
  },
  compatibleHeader: {
    fontWeight: 'bold',
    fontFamily: 'Avenir-Book',
    paddingHorizontal: 30,
    fontSize: 18,
    marginTop: 12,
  },
  compatibleItem: {
    paddingHorizontal: 30,
    fontFamily: 'Avenir-Book',
    fontSize: 16,
    marginVertical: 5,
  },
});
