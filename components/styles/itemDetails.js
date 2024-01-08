import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  footerText: {
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
    fontSize: 18,
    // fontWeight: 'bold',
    marginTop: 5,
  },
  image: {
    width,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  fetchRecipesContainer: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa', // example background color
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 100,
    // margin: 20,
  },
  fetchRecipesText: {
    fontFamily: 'Avenir-Book',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  fetchRecipesSubText: {
    fontSize: 16,
    fontFamily: 'Avenir-Book',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  background: {
    width: 120, // Adjust the width as needed
    height: 120, // Adjust the height as needed
    margin: 10,
  },
  headerText: {
    flex: 1,
    textAlign: 'left',
    fontSize: 32,
    marginVertical: 10,
    fontFamily: 'Avenir-Book',
  },
  storageTipText: {
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    paddingHorizontal: 30,
  },
  compatibleHeader: {
    fontWeight: 'bold',
    fontFamily: 'Avenir-Book',
    paddingHorizontal: 30,
    fontSize: 20,
    marginTop: 20,
  },
  compatibleItem: {
    paddingHorizontal: 30,
    fontFamily: 'Avenir-Book',
    fontSize: 20,
    marginVertical: 5,
  },
  noCompatibleItem: {
    fontSize: 14,
    color: 'grey',
    paddingHorizontal: 30,
  },
  techniquesHeader: {
    fontWeight: 'bold',
    fontFamily: 'Avenir-Book',
    paddingHorizontal: 30,
    fontSize: 20,
    marginTop: 20,
  },
  techniquesText: {
    paddingHorizontal: 30,
    fontFamily: 'Avenir-Book',
    fontSize: 20,
    marginVertical: 5,
    color: 'black', // You can choose a different color if needed
  },
});
