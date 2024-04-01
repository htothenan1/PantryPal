import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
  },
  contentContainer: {
    paddingBottom: 50,
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
  titleText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
    marginVertical: 20,
  },
});
