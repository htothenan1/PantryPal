import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingBottom: 50,
  },
  textContainer: {
    padding: 20,
  },
  titleText: {
    fontSize: 22,
    fontFamily: 'Avenir-Book',
  },
  redText: {
    color: 'red',
  },
  image: {
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  favoriteText: {
    marginLeft: 5,
    fontSize: 18,
    fontFamily: 'Avenir-Book',
  },
  servingsText: {
    fontSize: 18,
    fontFamily: 'Avenir-Book',
    marginBottom: 10,
  },
  ingredientsContainer: {
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
    backgroundColor: '#EDF2F4',
  },
  ingredientsTitleText: {
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
  instructionsTitleText: {
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
});
