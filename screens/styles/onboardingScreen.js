import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
  },
  screenWrapper: {
    marginBottom: 80,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  lowerImageWrapper: {
    alignItems: 'center',
  },
  image: {
    height: 80,
    width: 80,
  },
  lowerImage: {
    resizeMode: 'contain',
    width: 400,
    height: 400,
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
