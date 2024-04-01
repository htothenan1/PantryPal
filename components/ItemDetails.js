import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import groceryPic from '../assets/grocery.png';
import styles from './styles/itemDetails';
import {ingredients} from './data/ingredients';

const findIngredient = itemName => {
  let ingredient = ingredients.find(ing => ing.name === itemName);

  if (!ingredient) {
    for (let item of ingredients) {
      if (
        item.subItems &&
        item.subItems.some(subItem => subItem.name === itemName)
      ) {
        ingredient = item;
        break;
      }
    }
  }

  return ingredient;
};

const ItemDetails = ({route}) => {
  const item = route.params?.item || null;
  const userItems = route.params?.userItems || [];
  const ingredient = item ? findIngredient(item.name) : null;
  const itemImage = ingredient ? ingredient.img : groceryPic;

  const findCompatibleUserItems = () => {
    const compatibleIngredients = ingredients.find(
      ing => ing.name === item?.name,
    );

    const compatibles = compatibleIngredients?.compatibles || [];

    return compatibles.filter(compatibleItemName =>
      userItems.some(userItem => userItem.name === compatibleItemName),
    );
  };

  const compatibleUserItems = findCompatibleUserItems();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Image source={itemImage} style={styles.background} />
        <Text style={styles.headerText}>{item?.name}</Text>
      </View>
      <Text style={styles.compatibleHeader}>Storage Tips:</Text>
      <Text style={styles.storageTipText}>{item?.storage_tip}</Text>

      {ingredient?.techniques && (
        <View>
          <Text style={styles.techniquesHeader}>Cooking Techniques:</Text>
          <Text style={styles.techniquesText}>{ingredient.techniques}</Text>
        </View>
      )}

      {compatibleUserItems.length > 0 && (
        <View>
          <Text style={styles.compatibleHeader}>Best Pairings:</Text>
          {compatibleUserItems.map((compatibleItem, index) => (
            <Text key={index} style={styles.compatibleItem}>
              {compatibleItem}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default ItemDetails;
