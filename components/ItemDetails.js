import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import chefLogo from '../assets/chefs_hat.png';
import styles from './styles/itemDetails';
import {
  capitalizeWords,
  findIngredient,
  findCompatibleUserItems,
} from './helpers/functions';

const ItemDetails = ({route}) => {
  const item = route.params?.item || null;
  const userItems = route.params?.userItems || [];
  const ingredient = item ? findIngredient(item.name) : null;
  const itemImage = ingredient
    ? ingredient.img
    : item?.img
    ? {uri: item.img}
    : chefLogo;

  const compatibleUserItems = findCompatibleUserItems(
    item,
    ingredient,
    userItems,
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Image source={itemImage} style={styles.background} />
        <Text style={styles.headerText}>{capitalizeWords(item?.name)}</Text>
      </View>
      <Text style={styles.compatibleHeader}>Storage Tips:</Text>
      <Text style={styles.storageTipText}>{item?.storage_tip}</Text>

      {compatibleUserItems.length > 0 && (
        <View>
          <Text style={styles.compatibleHeader}>Your Best Pairings:</Text>
          {compatibleUserItems.map((compatibleItem, index) => (
            <Text key={index} style={styles.compatibleItem}>
              {capitalizeWords(compatibleItem)}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default ItemDetails;
