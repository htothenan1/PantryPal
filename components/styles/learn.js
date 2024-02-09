import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingBottom: 50,
  },
  chartContainer: {
    alignItems: 'center',
  },
  image: {
    width,
    height: 200,
    resizeMode: 'cover',
  },
  footerText: {
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
    fontSize: 18,
  },
  dashContainer: {
    height: 250,
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
  titleText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
    marginVertical: 20,

    // marginTop: 20,
  },
  headerIcon: {
    marginLeft: 10,
  },
});
