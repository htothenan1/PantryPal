import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    marginTop: 45,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  accountInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  accountImage: {
    width: 80,
    height: 80,
    marginLeft: 10,
  },
  titleContainer: {
    justifyContent: 'center',
    marginLeft: 8,
    flex: 1,
  },
  titleText: {
    textAlign: 'left',
    fontSize: 25,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
  },
  emailText: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
  },
  headerIcon: {
    marginLeft: 10,
  },
  button: {
    padding: 14,
    backgroundColor: '#1b4965',
    borderRadius: 10,
    marginVertical: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
  },
  headerText: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
  },
  preferencesContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  itemIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Avenir-Book',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Avenir-Book',
  },
  reasonText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
    fontFamily: 'Avenir-Book',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  paginationText: {
    fontSize: 14,
    color: '#1b4965',
    fontFamily: 'Avenir-Book',
  },
  logoutButton: {
    padding: 14,
    backgroundColor: '#1b4965',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 50,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
  },
  deleteAccountButton: {
    marginTop: 10,
    backgroundColor: '#B22222',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteAccountButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
  },
});
