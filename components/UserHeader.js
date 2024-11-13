import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import styles from './styles/userHeader.js';
import chefLogo from '../assets/chefs_hat.png';
import foodbank from '../assets/foodbankicon.png';

const UserHeader = ({selectedIcon, userData, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('User Account')}
      style={styles.headerContainer}>
      {selectedIcon ? (
        <Image source={foodbank} style={styles.userIcon} />
      ) : (
        <Image style={styles.userIcon} source={foodbank} />
      )}
      <View>
        <Text style={styles.userName}>{userData?.firstName}</Text>
        {/* <Text style={styles.levelText}>Level {userData?.level}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default UserHeader;
