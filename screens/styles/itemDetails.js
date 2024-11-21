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
    marginLeft: 16,
    marginRight: 4,
  },
  headerText: {
    flex: 1,
    textAlign: 'left',
    fontSize: 26,
    marginVertical: 10,
    fontFamily: 'Avenir-Book',
  },
  storageTipText: {
    fontSize: 17,
    fontFamily: 'Avenir-Book',
    paddingHorizontal: 30,
  },
  compatibleHeader: {
    fontWeight: 'bold',
    fontFamily: 'Avenir-Book',
    paddingHorizontal: 30,
    fontSize: 18,
  },
  compatibleItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginVertical: 5,
  },
  compatibleItemIcon: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  compatibleItem: {
    fontFamily: 'Avenir-Book',
    fontSize: 17,
  },
  storageTipContainer: {
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#EDF2F4',
  },
  healthFactsContainer: {
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#EDF2F4',
  },
  bestPairsContainer: {
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF3E0',
  },
});
