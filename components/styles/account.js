import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  logout: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10, // Add padding to give some space around the text
    paddingVertical: 5, // Add vertical padding for height
  },
  buttonContainer: {
    alignSelf: 'center', // This centers the button in its container horizontally
  },
  info: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Avenir-Book',
    marginVertical: 4,
    paddingHorizontal: 10,
    // Add other styles as needed
  },
});
