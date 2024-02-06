import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleText: {
    fontSize: 24,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    height: 200,
    width: '100%',
    marginBottom: 10,
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
  ingredientsTitleText: {
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  ingredientsText: {
    fontFamily: 'Avenir-Book',
    fontSize: 18,
    marginBottom: 5,
  },
  instructionsTitleText: {
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  instructionsText: {
    fontFamily: 'Avenir-Book',
    fontSize: 18,
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
