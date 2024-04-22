import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#1b4965',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 9 / 16,
  },
  retakeButton: {
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#77c3ec',
  },
  retakeText: {
    color: '#77c3ec',
    fontWeight: '500',
  },
  usePhotoButton: {
    backgroundColor: '#77c3ec',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  usePhotoText: {
    color: 'white',
    fontWeight: '500',
  },
  modeToggleContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeToggleButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  modeToggleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white', // Assuming modal background is white
  },
  modalTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Space between title and items list
  },
  modalItemText: {
    fontSize: 18,
    color: '#333', // Ensuring good contrast for readability
    paddingVertical: 10, // Adds space between items
  },
  confirmButton: {
    backgroundColor: '#77c3ec', // Color similar to usePhotoButton
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 20, // Space above the button
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16, // Matching the text size of usePhotoButton
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
});
