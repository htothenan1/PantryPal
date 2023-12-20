import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rightSwipeContainer: {
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-between',
  },
  swipeButton: {
    width: 50,
    backgroundColor: '#ff9f67',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsList: {
    backgroundColor: 'white',
    height: 250,
    marginHorizontal: 34,
    marginBottom: 100,
  },
  item: {
    borderWidth: 0.2,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#edede9',
  },
  itemTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 20,
    fontFamily: 'georgia',
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 50,
    backgroundColor: '#ff9f67',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  fabText: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'georgia',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomModalRows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    fontSize: 25,
    marginLeft: 5,
    fontFamily: 'georgia',
  },
  image: {
    width,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'georgia',
    marginVertical: 20,
  },
  footerText: {
    textAlign: 'center',
    fontFamily: 'georgia',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
