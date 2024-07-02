import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import chefLogo from '../assets/chefs_hat.png';
import styles from './styles/itemDetails';
import {ingredients} from './data/ingredients';

const findIngredient = itemName => {
  let ingredient = ingredients.find(
    ing => ing.name.toLowerCase() === itemName.toLowerCase(),
  );

  if (!ingredient) {
    for (let item of ingredients) {
      if (
        item.subItems &&
        item.subItems.some(
          subItem => subItem.name.toLowerCase() === itemName.toLowerCase(),
        )
      ) {
        ingredient = item.subItems.find(
          subItem => subItem.name.toLowerCase() === itemName.toLowerCase(),
        );
        break;
      }
    }
  }

  return ingredient;
};

function capitalizeWords(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

const ItemDetails = ({route}) => {
  const item = route.params?.item || null;
  const userItems = route.params?.userItems || [];
  const ingredient = item ? findIngredient(item.name) : null;
  const itemImage = ingredient
    ? ingredient.img
    : item?.img
    ? {uri: item.img}
    : chefLogo;

  const findCompatibleUserItems = () => {
    const compatibleIngredients =
      item?.compatibles || ingredient?.compatibles || [];

    return compatibleIngredients.filter(compatibleItemName =>
      userItems.some(
        userItem =>
          userItem.name.toLowerCase() === compatibleItemName.toLowerCase(),
      ),
    );
  };

  const compatibleUserItems = findCompatibleUserItems();

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
