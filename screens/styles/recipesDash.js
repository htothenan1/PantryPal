import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const cardWidth = (width * 2) / 4;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 45,
  },
  recipesLoadingContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsLoadingContainer: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures buttons are spaced properly
    marginVertical: 20,
    paddingHorizontal: 20, // Add some padding to the container
  },
  buttonLarge: {
    flex: 2, // Takes 2/3 of the space
    padding: 15,
    borderRadius: 10,
    marginRight: 10, // Adds spacing between buttons
    alignItems: 'center',
  },
  buttonSmall: {
    flex: 1, // Takes 1/3 of the space
    padding: 15,
    borderRadius: 10,
    marginLeft: 10, // Adds spacing between buttons
    alignItems: 'center',
  },
  selectedItemStyle: {
    backgroundColor: '#1b4965',
  },
  selectedItemText: {
    color: 'white',
  },
  headerIcon: {
    marginHorizontal: 10,
  },
  recipesContainer: {
    height: 250,
  },
  item: {
    borderWidth: 0.2,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 18,
    fontFamily: 'Avenir-Book',
  },
  itemExpInt: {
    fontSize: 14,
    fontFamily: 'Avenir-Book',
  },
  image: {
    width: cardWidth,
    height: 200,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
    fontSize: 15,
    marginTop: 5,
    width: cardWidth,
  },
  fetchRecipesContainer: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  fetchRecipesText: {
    fontFamily: 'Avenir-Book',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  fetchRecipesSubText: {
    fontSize: 16,
    fontFamily: 'Avenir-Book',
    textAlign: 'center',
    paddingHorizontal: 14,
  },
  emptyStateContainer: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  emptyStateText: {
    fontFamily: 'Avenir-Book',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 15,
  },
  saveText: {
    fontFamily: 'Avenir-Book',
    fontSize: 14,
    color: 'black',
  },
  whiteText: {
    color: 'white',
  },
  itemImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});
