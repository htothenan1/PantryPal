import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
const cardWidth = (width * 2) / 4;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 45,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  image: {
    width: cardWidth,
    height: 200,
    resizeMode: 'cover',
    marginRight: 50,
  },
  footerText: {
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
    fontSize: 18,
    width: cardWidth,
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
