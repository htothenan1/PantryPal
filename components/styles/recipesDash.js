import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    backgroundColor: '#495057',
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
    width,
    height: 200,
    resizeMode: 'cover',
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
    fontSize: 18,
    marginTop: 5,
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
  },
});
