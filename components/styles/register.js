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
    fontFamily: 'georgia',
    fontWeight: '500',
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
    backgroundColor: '#ff9f67',
    width: '100%',
    paddingVertical: 15,
    marginVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'georgia',
  },
  registerText: {
    fontSize: 16,
    fontFamily: 'georgia',
  },
  registerHyperlink: {
    color: 'green',
  },
});
