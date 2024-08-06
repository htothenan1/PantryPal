import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#1b4965',
  },
  activeTab: {
    backgroundColor: '#1b4965',
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: '#fff',
  },
  inactiveTabText: {
    color: '#1b4965',
  },
  recipeItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  recipeName: {
    fontSize: 18,
  },
});
