import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const midpoint = height / 3;
const lineHeight = midpoint / 3;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  pointsText: {
    fontFamily: 'Avenir-Book',
    fontSize: 18,
  },
  maxScoreText: {
    fontFamily: 'Avenir-Book',
    fontSize: 18,
  },
  binsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  middleSection: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  binSection: {
    width: width / 3.5,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  binLabel: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
  },
  item: {
    position: 'absolute',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 50,
  },
  midpointLine: {
    position: 'absolute',
    top: lineHeight,
    width: '100%',
    height: 1,
    borderColor: 'black',
  },
  restartButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#1b4965',
    borderRadius: 10,
  },
  restartButtonText: {
    color: '#fff',
    fontFamily: 'Avenir-Book',
    fontSize: 16,
  },
});
