import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  dashLoadingContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 24,
  },
  headerIcon: {
    marginHorizontal: 10,
  },
  dashContainer: {
    height: 250,
  },
  rightSwipeContainer: {
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-between',
  },
  swipeButton: {
    width: 50,
    backgroundColor: '#dee2e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: 100,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  itemsList: {
    marginBottom: 80,
  },
  item: {
    borderWidth: 0.2,
    paddingHorizontal: 25,
    paddingVertical: 14,
    // backgroundColor: '#f8f9fa',
    backgroundColor: 'white',
  },
  itemTextContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 20,
    fontFamily: 'Avenir-Book',
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 10,
    backgroundColor: '#495057',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  emptyFab: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#495057',
    borderRadius: 28,
  },
  leftFab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
    bottom: 10,
    backgroundColor: '#495057',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  // centerFab: {
  //   position: 'absolute',
  //   width: 56,
  //   height: 56,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   left: '50%',
  //   marginLeft: -28,
  //   bottom: 10,
  //   backgroundColor: '#495057',
  //   borderRadius: 28,
  //   elevation: 8,
  //   shadowColor: '#000',
  //   shadowOpacity: 0.2,
  //   shadowRadius: 5,
  //   shadowOffset: {width: 0, height: 2},
  // },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 20,
  },
  modalHeader: {
    marginVertical: 10,
    fontFamily: 'Avenir-Book',
    fontSize: 20,
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
    marginVertical: 20,
  },
  footerText: {
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
    fontSize: 18,
    marginTop: 5,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center', // Vertically centers the content
    alignItems: 'center', // Horizontally centers the content
    paddingHorizontal: 30, // Adds some padding on the sides
  },
  emptyStateText: {
    fontSize: 24, // Adjust the font size as needed
    fontFamily: 'Avenir-Book',
    lineHeight: 60,
    textAlign: 'center', // Ensures the text is centered if it wraps to a new line
    color: '#666', // A neutral color for the text, but feel free to change it
  },
});
