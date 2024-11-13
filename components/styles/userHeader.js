import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderBottomWidth: 0.2,
    marginTop: 50,
  },
  userIcon: {
    width: 55,
    height: 55,
    borderRadius: 25,
  },
  userName: {
    marginLeft: 10,
    fontSize: 30,
    fontFamily: 'Avenir-Book',
    marginTop: 8,
    // fontWeight: 'bold',
  },
  levelText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'Avenir-Book',
  },
});
