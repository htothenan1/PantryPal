import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles/itemDetails';

const ItemDetails = ({route}) => {
  const item = route.params?.item || null;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{item.name}</Text>
      <Text style={styles.storageTipText}>{item.storage_tip}</Text>
    </View>
  );
};

export default ItemDetails;
