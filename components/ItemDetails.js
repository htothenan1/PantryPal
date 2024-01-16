import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import groceryPic from '../assets/grocery.png';
import styles from './styles/itemDetails';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {SPOON_KEY} from '@env';
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

const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};

const ItemDetails = ({route}) => {
  const navigation = useNavigation();

  const [isRecipesLoading, setIsRecipesLoading] = useState(false);
  const [fetchedRecipes, setFetchedRecipes] = useState(null);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const renderItems = ({item}) => {
    const title =
      item.title.length > 15 ? `${item.title.slice(0, 30)}...` : item.title;

    return (
      <TouchableOpacity
        onPress={() => handleSelectRecipe(item.id)}
        activeOpacity={1}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text style={styles.footerText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const handleSelectRecipe = async data => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${data}/information?apiKey=${SPOON_KEY}&includeNutrition=false`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const recipe = await response.json();
      navigation.navigate('RecipeDetails', {recipe});
    } catch (error) {
      console.error('Error fetching recipe information:', error.message);
    }
  };

  const handleRefreshRecipes = async () => {
    await fetchRecipes([item.name, ...compatibleUserItems]);
  };

  const onViewRef = useRef(({changed}) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const fetchRecipes = async items => {
    setIsRecipesLoading(true);

    if (items && items.length > 0) {
      const queryString = items.join(',+');
      const randomInt = Math.floor(Math.random() * 10) + 1;
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${SPOON_KEY}&ingredients=${queryString}&offset=${randomInt}&number=20`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const resItems = await response.json();
        setFetchedRecipes(resItems);
        setIsRecipesLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error.message);
      }
    } else {
      setIsRecipesLoading(false);
    }
  };

  const compatibleUserItems = findCompatibleUserItems();

  return (
    <ScrollView style={styles.container}>
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

      {compatibleUserItems && (
        <View>
          <Text style={styles.compatibleHeader}>Your Compatibles:</Text>
          {compatibleUserItems.length > 0 ? (
            compatibleUserItems.map((compatibleItem, index) => (
              <Text key={index} style={styles.compatibleItem}>
                {compatibleItem}
              </Text>
            ))
          ) : (
            <Text style={styles.noCompatibleItem}>None found</Text>
          )}
        </View>
      )}

      <View style={styles.recipesContainer}>
        {!fetchedRecipes && !isRecipesLoading && (
          <View style={styles.fetchRecipesContainer}>
            <TouchableOpacity onPress={handleRefreshRecipes}>
              <AntDesignIcon name="reload1" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.fetchRecipesText}>
              Get Recipes Based On Your
              {compatibleUserItems.length > 0 ? ' Compatibles' : ' Item'}!
            </Text>
            <Text style={styles.fetchRecipesSubText}>
              Tap the refresh icon to start!
            </Text>
          </View>
        )}

        {isRecipesLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          fetchedRecipes &&
          fetchedRecipes.length > 0 && (
            <FlatList
              data={fetchedRecipes}
              renderItem={renderItems}
              keyExtractor={index => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              ref={ref => {
                flatListRef.current = ref;
              }}
              style={styles.carousel}
              viewabilityConfig={viewConfigRef}
              onViewableItemsChanged={onViewRef.current}
            />
          )
        )}
      </View>
    </ScrollView>
  );
};

export default ItemDetails;
