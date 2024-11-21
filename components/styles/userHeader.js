import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 14,
    paddingHorizontal: 25,
    borderBottomWidth: 0.5,
    marginTop: 10,
  },
  userIcon: {
    width: 55,
    height: 55,
  },
  userName: {
    marginLeft: 12,
    fontSize: 26,
    fontFamily: 'Avenir-Book',
  },
  levelText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'Avenir-Book',
  },
});
