import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles/itemDetails';
import {ingredients} from './data/ingredients';

const findIngredientImage = itemName => {
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

  return ingredient ? ingredient.img : null;
};

const ItemDetails = ({route}) => {
  const item = route.params?.item || null;
  const userItems = route.params?.userItems || [];

  const itemImage = item ? findIngredientImage(item.name) : null;

  const findCompatibleUserItems = () => {
    const ingredient = ingredients.find(ing => ing.name === item?.name);

    // Get the list of compatibles from the ingredients object
    const compatibles = ingredient?.compatibles || [];

    // Filter out compatibles that exist in the user's item list
    return compatibles.filter(compatibleItemName =>
      userItems.some(userItem => userItem.name === compatibleItemName),
    );
  };

  const compatibleUserItems = findCompatibleUserItems();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={itemImage} style={styles.background} />
        <Text style={styles.headerText}>{item?.name}</Text>
      </View>
      <Text style={styles.storageTipText}>{item?.storage_tip}</Text>

      {compatibleUserItems && (
        <View>
          <Text style={styles.compatibleHeader}>Your Compatible Items:</Text>
          {compatibleUserItems.length > 0 ? (
            compatibleUserItems.map((compatibleItem, index) => (
              <Text key={index} style={styles.compatibleItem}>
                {compatibleItem}
              </Text>
            ))
          ) : (
            <Text style={styles.noCompatibleItem}>
              No compatible items found.
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default ItemDetails;
