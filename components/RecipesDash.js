import React, {useRef, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';
import {SPOON_KEY} from '@env';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {auth} from '../firebase';
import styles from './styles/recipesDash';

const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};
const API_URL = 'https://flavr-413021.ue.r.appspot.com/';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [fetchedRecipes, setFetchedRecipes] = useState(null);
  const flatListRef = useRef(null);
  const [currId, setCurrentIndex] = useState(0);
  const [isRecipesLoading, setIsRecipesLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isItemsLoading, setIsItemsLoading] = useState(false);

  const capitalizeWords = str => {
    if (!str) {
      return '';
    }
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

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

    fetchRecipes(itemsToUse);
  };

  const fetchItems = async () => {
    setIsItemsLoading(true);

    try {
      if (!userEmail) {
        console.error('User email is not available');
        return;
      }

      const response = await fetch(`${API_URL}/items?email=${userEmail}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const sortedItems = data.sort((a, b) => {
        const dateA = new Date(a.exp_date);
        const dateB = new Date(b.exp_date);
        return dateA - dateB;
      });

      setItems(sortedItems);
      setIsItemsLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error.message);
      setIsItemsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      setSelectedItems([]);
      const fetchData = async () => {
        await fetchItems();
      };

      if (isActive) {
        fetchData().catch(console.error);
      }

      return () => {
        isActive = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const renderItem = ({item}) => {
    const isSelected = selectedItems.includes(item.name);

    return (
      <TouchableOpacity
        onPress={() => handleLongPress(item.name)}
        style={[styles.item, isSelected && styles.selectedItemStyle]}>
        <View style={styles.itemTextContainer}>
          <Text
            style={[styles.itemText, isSelected && styles.selectedItemText]}>
            {capitalizeWords(item.name)}
          </Text>
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
      const randomInt = Math.floor(Math.random() * 10) + 1;
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${SPOON_KEY}&ingredients=${queryString}&offset=${randomInt}&number=25`,
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

  const handleSelectRecipe = async data => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${data}/information?apiKey=${SPOON_KEY}&includeNutrition=false`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const recipe = await response.json();
      navigation.navigate('RecipeDetails', {
        recipe,
        selectedIngredients: selectedItems,
      });
    } catch (error) {
      console.error('Error fetching recipe information:', error.message);
    }
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

  return (
    <View style={styles.container}>
      <View style={styles.headerText}>
        <Text style={styles.titleText}>Recipes</Text>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={handleRefreshRecipes}>
          <AntDesignIcon name="search1" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.recipesContainer}>
        {!fetchedRecipes && !isRecipesLoading && (
          <TouchableOpacity onPress={handleRefreshRecipes}>
            <View style={styles.fetchRecipesContainer}>
              <AntDesignIcon name="search1" size={30} color="black" />
              <Text style={styles.fetchRecipesText}>
                Get Recipes Based On Your Items!
              </Text>
              <Text style={styles.fetchRecipesSubText}>
                Choose one or more items and tap the search icon to find
                recipes!
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {isRecipesLoading ? (
          <View style={styles.recipesLoadingContainer}>
            <ActivityIndicator size="large" color="#495057" />
          </View>
        ) : (
          fetchedRecipes &&
          fetchedRecipes.length > 0 && (
            <FlatList
              data={fetchedRecipes}
              renderItem={renderItems}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={true}
              pagingEnabled
              ref={ref => {
                flatListRef.current = ref;
              }}
              viewabilityConfig={viewConfigRef}
              onViewableItemsChanged={onViewRef.current}
            />
          )
        )}
      </View>
      <View style={styles.headerText}>
        <Text style={styles.titleText}>Your Items ({items.length})</Text>
      </View>
      {isItemsLoading ? (
        <View style={styles.itemsLoadingContainer}>
          <ActivityIndicator size="large" color="#495057" />
        </View>
      ) : (
        <FlatList
          windowSize={10}
          data={items}
          keyExtractor={item => item._id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Dashboard;
