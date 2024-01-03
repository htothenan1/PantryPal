import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
});
