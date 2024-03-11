import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    fontSize: 24,
    marginTop: 10,
  },
  contentText: {
    // textAlign: 'center',
    fontFamily: 'Avenir-Book',
    fontSize: 20,
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
    borderRadius: 10, // Adjust for more or less rounded corners
    marginHorizontal: 50, // Adds some margin on the sides
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Avenir-Book', // or any preferred font
  },
});
