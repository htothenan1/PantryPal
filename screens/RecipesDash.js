import React, {useRef, useState, useContext, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {UserContext} from '../contexts/UserContext';
import {capitalizeWords} from './helpers/functions';
import {SPOON_KEY} from '@env';
import {IconToolsKitchen2} from '@tabler/icons-react-native';
import {auth} from '../firebase';
import {ingredients} from './data/ingredients';
import chefLogo from '../assets/chefs_hat.png';
import foodbankicon from '../assets/foodbankicon.png';

import styles from './styles/recipesDash';

const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};
const {width} = Dimensions.get('window');
const cardWidth = (width * 2) / 4;

const RecipesDash = () => {
  const {items, fetchItems} = useContext(UserContext);
  const [fetchedRecipes, setFetchedRecipes] = useState(null);
  const flatListRef = useRef(null);
  const [currId, setCurrentIndex] = useState(0);
  const [isRecipesLoading, setIsRecipesLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  const navigation = useNavigation();
  const userEmail = auth.currentUser?.email;

  const handleLongPress = itemName => {
    setSelectedItems(prevSelectedItems => {
      if (prevSelectedItems.includes(itemName)) {
        return prevSelectedItems.filter(name => name !== itemName);
      } else {
        return [...prevSelectedItems, itemName];
      }
    });
  };

  const handleRefreshRecipes = () => {
    const itemsToUse =
      selectedItems.length > 0
        ? items.filter(item => selectedItems.includes(item.name))
        : items.slice(0, 10);

    setHasFetched(true);
    fetchRecipes(itemsToUse);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchItems(userEmail);
    };

    fetchData(userEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}) => {
    const isSelected = selectedItems.includes(item.name);

    // Find the corresponding ingredient to get the image
    const ingredient = ingredients.find(
      ing =>
        ing.name &&
        item.name &&
        ing.name.toLowerCase() === item.name.toLowerCase(),
    );

    const itemImage = ingredient ? ingredient.img : chefLogo;

    return (
      <TouchableOpacity
        onPress={() => handleLongPress(item.name)}
        style={[styles.item, isSelected && styles.selectedItemStyle]}>
        <Image source={itemImage} style={styles.itemImage} />
        <View style={styles.itemTextContainer}>
          <Text
            style={[styles.itemText, isSelected && styles.selectedItemText]}>
            {capitalizeWords(item.name)}
          </Text>
          {/* <Text
            style={[styles.itemExpInt, isSelected && styles.selectedItemText]}>
            Default Exp: {item.exp_int ? `${item.exp_int} days` : 'N/A'}
          </Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  const onViewRef = useRef(({changed}) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const fetchRecipes = async currentItems => {
    setIsRecipesLoading(true);

    if (currentItems && currentItems.length > 0) {
      const queryString = currentItems.map(item => item.name).join(',+');
      // const randomInt = Math.floor(Math.random() * 10) + 1;
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${SPOON_KEY}&ingredients=${queryString}&number=25`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const resItems = await response.json();
        // console.log(resItems);
        setFetchedRecipes(resItems);
        setIsRecipesLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error.message);
      }
    } else {
      setFetchedRecipes([]);
      setIsRecipesLoading(false);
    }
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
      navigation.navigate('Recipe Details', {
        recipe,
        selectedIngredients: selectedItems,
      });
    } catch (error) {
      console.error('Error fetching recipe information:', error.message);
    }
  };

  const renderItems = ({item}) => {
    const title =
      item.title.length > 35 ? `${item.title.slice(0, 50)}...` : item.title;

    return (
      <TouchableOpacity
        onPress={() => handleSelectRecipe(item.id)}
        activeOpacity={1}
        style={{width: cardWidth, borderRadius: 20, marginHorizontal: 2}}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text style={styles.footerText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.recipesContainer}>
        {!fetchedRecipes && !isRecipesLoading && (
          <View style={styles.fetchRecipesContainer}>
            <IconToolsKitchen2 color={'black'} size={40} />
            <Text style={styles.fetchRecipesText}>
              Get Recipes Based On Your Items!
            </Text>
            <Text style={styles.fetchRecipesSubText}>
              Select one or more items to get started!
            </Text>
          </View>
        )}

        {isRecipesLoading ? (
          <View style={styles.recipesLoadingContainer}>
            <ActivityIndicator size="large" color="#495057" />
          </View>
        ) : fetchedRecipes && fetchedRecipes.length > 0 ? (
          <FlatList
            data={fetchedRecipes}
            renderItem={renderItems}
            keyExtractor={(item, index) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={true}
            pagingEnabled
            ref={ref => {
              flatListRef.current = ref;
            }}
            viewabilityConfig={viewConfigRef}
            onViewableItemsChanged={onViewRef.current}
          />
        ) : (
          hasFetched && (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>
                No recipes found with the selected ingredients. Try selecting
                different items.
              </Text>
            </View>
          )
        )}
      </View>
      <View style={styles.headerText}>
        <Text style={styles.titleText}>Your Items ({items.length})</Text>
        <Pressable
          disabled={selectedItems.length === 0}
          onPress={handleRefreshRecipes}
          style={({pressed}) => [
            styles.button,
            {backgroundColor: pressed ? 'rgba(0, 0, 255, 0.5)' : '#228B22'},
            selectedItems.length === 0 && styles.disabledButton,
          ]}>
          <Text
            style={[
              styles.saveText,
              selectedItems.length > 0 && styles.whiteText,
            ]}>
            Get Recipes
          </Text>
        </Pressable>
        <Pressable
          disabled={selectedItems.length === 0}
          onPress={() => setSelectedItems([])}
          style={({pressed}) => [
            styles.button,
            {backgroundColor: pressed ? 'rgba(0, 0, 255, 0.5)' : '#B22222'},
            selectedItems.length === 0 && styles.disabledButton,
          ]}>
          <Text
            style={[
              styles.saveText,
              selectedItems.length > 0 && styles.whiteText,
            ]}>
            Clear
          </Text>
        </Pressable>
      </View>

      <FlatList
        windowSize={10}
        data={items}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default RecipesDash;
