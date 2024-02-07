import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smileLogo: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 28,
    fontFamily: 'Avenir-Book',
    marginVertical: 10,
    textAlign: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#f0efeb',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#343a40',
    width: '100%',
    paddingVertical: 15,
    marginVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 16,
  },
  // registerText: {
  //   fontSize: 16,
  //   fontFamily: 'Avenir-Book',
  // },
  // registerHyperlink: {
  //   color: '#386641',
  // },
});
