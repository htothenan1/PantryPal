import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import styles from './styles/userHeader.js';
import foodbank from '../assets/foodbankicon.png';

const UserHeader = ({userData, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('User Account')}
      style={styles.headerContainer}>
      <Image source={foodbank} style={styles.userIcon} />

      <View>
        <Text style={styles.userName}>{userData?.firstName}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserHeader;
