import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  screenWrapper: {
    marginBottom: 80,
  },
  image: {
    height: 200,
    width: '100%',
    marginBottom: 10,
    resizeMode: 'cover',
  },
  titleText: {
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
    fontSize: 20,
    marginTop: 10,
  },
  contentText: {
    fontFamily: 'Avenir-Book',
    fontSize: 18,
    marginTop: 10,
    marginHorizontal: 16,
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
