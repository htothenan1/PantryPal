import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  screenWrapper: {
    marginBottom: 80,
  },
  titleText: {
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
    fontSize: 22,
    marginTop: 10,
  },
  image: {
    height: 200,
    width: '100%',
    marginBottom: 10,
    resizeMode: 'cover',
  },
  overviewContainer: {
    padding: 20,
    backgroundColor: '#e5e5e5',
    margin: 20,
    borderRadius: 20,
  },
  overviewTitle: {
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
    fontSize: 20,
  },
  introText: {
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
    fontSize: 18,
    paddingHorizontal: 12,
  },
  bulletText: {
    marginLeft: 20,
    fontFamily: 'Avenir-Book',
    fontSize: 17,
  },
  startButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#1b4965',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 50,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
  },
});
