import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import chefLogo from '../assets/chefs_hat.png';
import foodbankicon from '../assets/foodbankicon.png';
import styles from './styles/itemDetails';
import {
  capitalizeWords,
  findIngredient,
  findCompatibleUserItems,
} from '../screens/helpers/functions';
import {ingredients} from './data/ingredients';

const ItemDetails = ({route}) => {
  const item = route.params?.item || null;
  const userItems = route.params?.userItems || [];
  const ingredient = item ? findIngredient(item.name) : null;
  const itemImage = ingredient
    ? ingredient.img
    : item?.img
    ? {uri: item.img}
    : foodbankicon;

  const compatibleUserItems = findCompatibleUserItems(
    item,
    ingredient,
    userItems,
  );

  const getIconForItem = itemName => {
    const ingredient = ingredients.find(
      ingredient => ingredient.name.toLowerCase() === itemName.toLowerCase(),
    );
    return ingredient ? ingredient.img : chefLogo;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Image source={itemImage} style={styles.background} />
        <Text style={styles.headerText}>{capitalizeWords(item?.name)}</Text>
      </View>
      <View style={styles.storageTipContainer}>
        <Text style={styles.compatibleHeader}>Storage Tips</Text>
        <Text style={styles.storageTipText}>{item?.storage_tip}</Text>
      </View>
      <View style={styles.healthFactsContainer}>
        <Text style={styles.compatibleHeader}>Health Facts</Text>
        <Text style={styles.storageTipText}>{item?.whyEat}</Text>
      </View>

      {compatibleUserItems.length > 0 && (
        <View style={styles.bestPairsContainer}>
          <Text style={styles.compatibleHeader}>Your Best Pairings</Text>
          {compatibleUserItems.map((compatibleItem, index) => (
            <View key={index} style={styles.compatibleItemContainer}>
              <Image
                source={getIconForItem(compatibleItem)}
                style={styles.compatibleItemIcon}
              />
              <Text style={styles.compatibleItem}>
                {capitalizeWords(compatibleItem)}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default ItemDetails;
