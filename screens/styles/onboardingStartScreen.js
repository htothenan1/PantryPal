import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 80,
  },
  screenWrapper: {
    marginBottom: 80,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
    fontSize: 22,
    marginTop: 10,
  },
  image: {
    height: 180,
    width: 180,
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
    textAlign: 'left',
    fontFamily: 'Avenir-Book',
    fontSize: 18,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  bulletText: {
    marginLeft: 20,
    fontFamily: 'Avenir-Book',
    fontSize: 20,
  },
  startButton: {
    position: 'absolute',
    bottom: 20, // Set the bottom margin
    left: 0,
    right: 0, // Ensures the View spans the full width
    justifyContent: 'center', // This will center the button horizontally
    alignItems: 'center', // Centers the button in the added View
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
