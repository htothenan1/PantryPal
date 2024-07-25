import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const cardWidth = (width * 2) / 4;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 75,
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
    justifyContent: 'flex-start',
    marginVertical: 20,
    paddingLeft: 28,
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
    paddingVertical: 14,
    backgroundColor: '#f8f9fa',
    flexDirection: 'row', // Added to align items in a row
    alignItems: 'center', // Center items vertically
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 20,
    fontFamily: 'Avenir-Book',
  },
  itemExpInt: {
    fontSize: 14,
    fontFamily: 'Avenir-Book',
  },
  image: {
    width: cardWidth,
    height: 200,
    // resizeMode: 'cover',
    // marginRight: 50,
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
    marginHorizontal: 8,
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
