import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  titleText: {
    fontSize: 24,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textContainer: {
    padding: 20,
  },
  image: {
    height: 200,
    width: '100%',
    marginBottom: 10,
    resizeMode: 'cover',
  },
  paragraphTitle: {
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  paragraphContent: {
    fontFamily: 'Avenir-Book',
    fontSize: 18,
    marginVertical: 10,
  },
});
