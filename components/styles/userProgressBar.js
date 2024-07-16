import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  progressContainer: {
    paddingVertical: 11,
    paddingHorizontal: 25,
    borderBottomWidth: 0.2,
  },
  progressTitle: {
    fontFamily: 'Avenir-Book',
    fontSize: 16,
    color: '#000',
  },
  progressBar: {
    alignSelf: 'stretch',
    marginVertical: 5,
  },
  progressText: {
    textAlign: 'left',
    fontSize: 16,
    color: '#000',
    fontFamily: 'Avenir-Book',
  },
  progressLoadingSpinner: {height: 42},
});
