import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'Avenir-Book',
  },
  bubbleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  bubble: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBubble: {
    backgroundColor: '#1b4965',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
  unselectedBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
  },
  bubbleText: {
    fontSize: 13,
    fontFamily: 'Avenir-Book',
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  selectedText: {
    color: 'white',
  },
  expandedBubble: {
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  expandedText: {
    fontSize: 24,
    marginBottom: 10,
  },
  expandedInfoText: {
    color: 'black',
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'Avenir-Book',
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#1b4965',
    borderRadius: 10,
    marginBottom: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
  },
  nextButton: {
    padding: 10,
    backgroundColor: '#1b4965',
    borderRadius: 10,
    marginBottom: 20,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
  },
});
