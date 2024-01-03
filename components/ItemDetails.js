import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles/itemDetails';
import {ingredients} from './data/ingredients';

const findIngredientImage = itemName => {
  // First, try to find the ingredient directly by name
  let ingredient = ingredients.find(ing => ing.name === itemName);

  // If not found, look for a parent item that contains the sub-item
  if (!ingredient) {
    for (let item of ingredients) {
      if (
        item.subItems &&
        item.subItems.some(subItem => subItem.name === itemName)
      ) {
        ingredient = item; // Assign the parent item if the sub-item is found
        break;
      }
    }
  }

  // Return the image if found, otherwise return a default image or null
  return ingredient ? ingredient.img : null;
};

const ItemDetails = ({route}) => {
  const item = route.params?.item || null;

  const itemImage = item ? findIngredientImage(item.name) : null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={itemImage} style={styles.background} />
        <Text style={styles.headerText}>{item.name}</Text>
      </View>
      <Text style={styles.storageTipText}>{item.storage_tip}</Text>
    </View>
  );
};

export default ItemDetails;
