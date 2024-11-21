import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  recipeContainer: {
    marginTop: 20,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Avenir-Book',
  },
  ingredientsContainer: {
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
    backgroundColor: '#EDF2F4',
  },
  ingredientsTitle: {
    fontSize: 18,
    fontFamily: 'Avenir-Book',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  ingredientsText: {
    fontFamily: 'Avenir-Book',
    fontSize: 16,
    marginVertical: 1,
  },
  instructionsContainer: {
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
    backgroundColor: '#EDF2F4',
  },
  instructionsTitle: {
    fontSize: 18,
    fontFamily: 'Avenir-Book',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  instructionsText: {
    fontFamily: 'Avenir-Book',
    fontSize: 16,
    marginVertical: 1,
  },
  redText: {
    color: 'red',
  },
  blueText: {
    color: 'blue',
  },
});
