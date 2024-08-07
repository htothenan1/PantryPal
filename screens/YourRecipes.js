import React, {useContext, useEffect, useRef, useState} from 'react';
import {Text, ScrollView, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {Swipeable} from 'react-native-gesture-handler';
import {API_URL, SPOON_KEY} from '@env';
import {auth} from '../firebase';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {UserContext} from '../contexts/UserContext';
import styles from './styles/favoriteRecipes';

const YourRecipes = () => {
  const {
    favoriteRecipes,
    setFavoriteRecipes,
    fetchFavoriteRecipes,
    importedRecipes,
    setImportedRecipes,
    fetchImportedRecipes,
  } = useContext(UserContext);

  const [showFavorites, setShowFavorites] = useState(true);
  const navigation = useNavigation();
  const userEmail = auth.currentUser?.email;
  const swipeableRefs = useRef(new Map()).current;

  useEffect(() => {
    fetchFavoriteRecipes(userEmail);
    fetchImportedRecipes(userEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRecipePress = async (recipeId, isImported = false) => {
    if (isImported) {
      const recipe = importedRecipes.find(r => r._id === recipeId);
      navigation.navigate('Imported Recipe Details', {recipe});
    } else {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOON_KEY}&includeNutrition=false`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const recipe = await response.json();
        navigation.navigate('Recipe Details', {recipe});
      } catch (error) {
        console.error('Error fetching recipe information:', error.message);
      }
    }
  };

  const renderRightActions = (recipeId, recipeName, isImported) => {
    return (
      <View style={styles.rightSwipeContainer}>
        <TouchableOpacity
          onPress={() =>
            isImported
              ? handleDeleteImported(recipeId)
              : // : handleDeleteFavorite(recipeId, recipeName)
                null
          }
          style={styles.swipeButton}>
          <AntDesignIcon name="delete" size={20} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const swipeableRecipeItem = ({item, isImported}) => {
    return (
      <Swipeable
        ref={ref => swipeableRefs.set(item._id, ref)}
        renderRightActions={() =>
          renderRightActions(
            item._id,
            isImported ? item.name : item.recipeName,
            isImported,
          )
        }
        onSwipeableWillOpen={() => {
          swipeableRefs.forEach((ref, key) => {
            if (key !== item._id && ref) {
              ref.close();
            }
          });
        }}>
        <TouchableOpacity
          onPress={() => handleRecipePress(item._id, isImported)}
          key={item._id}
          style={styles.recipeItem}>
          <Text style={styles.recipeName}>
            {isImported ? item.name : item.recipeName}
          </Text>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  // const handleDeleteFavorite = async (recipeId, recipeName) => {
  //   const swipeableRef = swipeableRefs.get(recipeId);
  //   if (swipeableRef) {
  //     swipeableRef.close();
  //   }

  //   try {
  //     const response = await fetch(`${API_URL}/favorites`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         recipeId,
  //         user: userEmail,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to delete favorite recipe');
  //     }

  //     setFavoriteRecipes(prev =>
  //       prev.filter(recipe => recipe.recipeId !== recipeId),
  //     );
  //   } catch (error) {
  //     console.error('Error deleting favorite recipe:', error.message);
  //   }
  // };

  const handleDeleteImported = async recipeId => {
    const swipeableRef = swipeableRefs.get(recipeId);
    if (swipeableRef) {
      swipeableRef.close();
    }

    try {
      const response = await fetch(
        `${API_URL}/importedRecipes/${recipeId}?email=${userEmail}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to delete imported recipe');
      }

      setImportedRecipes(prev =>
        prev.filter(recipe => recipe._id !== recipeId),
      );
    } catch (error) {
      console.error('Error deleting imported recipe:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, showFavorites && styles.activeTab]}
          onPress={() => setShowFavorites(true)}>
          <Text
            style={[
              styles.tabText,
              showFavorites ? styles.activeTabText : styles.inactiveTabText,
            ]}>
            Favorite Recipes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, !showFavorites && styles.activeTab]}
          onPress={() => setShowFavorites(false)}>
          <Text
            style={[
              styles.tabText,
              !showFavorites ? styles.activeTabText : styles.inactiveTabText,
            ]}>
            Imported Recipes
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {showFavorites
          ? favoriteRecipes.map(recipe => (
              <TouchableOpacity
                key={recipe._id}
                onPress={() => handleRecipePress(recipe.recipeId)}
                style={styles.recipeItem}>
                <Text style={styles.recipeName}>{recipe.recipeName}</Text>
              </TouchableOpacity>
            ))
          : importedRecipes.map(recipe =>
              swipeableRecipeItem({item: recipe, isImported: true}),
            )}
      </ScrollView>
    </View>
  );
};

export default YourRecipes;
