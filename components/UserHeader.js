import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import styles from './styles/userHeader.js';

const UserHeader = ({selectedIcon, userData, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Account')}
      style={styles.headerContainer}>
      {selectedIcon ? (
        <Image source={selectedIcon} style={styles.userIcon} />
      ) : (
        <AntDesignIcon
          style={styles.userIcon}
          name="user"
          size={53}
          color="black"
        />
      )}
      <View>
        <Text style={styles.userName}>{userData?.firstName}</Text>
        <Text style={styles.levelText}>Level {userData?.level}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserHeader;
