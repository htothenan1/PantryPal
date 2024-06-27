import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const cardWidth = (width * 2) / 3;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
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
    justifyContent: 'center',
    marginVertical: 20,
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
  },
  itemTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 20,
    fontFamily: 'Avenir-Book',
  },
  image: {
    width: cardWidth,
    height: 200,
    resizeMode: 'cover',
    marginRight: 50,
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
});
