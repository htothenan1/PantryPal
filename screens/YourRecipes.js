/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Text, ScrollView, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {API_URL, SPOON_KEY} from '@env';
import {auth} from '../firebase';
import styles from './styles/favoriteRecipes';

const YourRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [importedRecipes, setImportedRecipes] = useState([]);
  const [showFavorites, setShowFavorites] = useState(true);
  const navigation = useNavigation();
  const userEmail = auth.currentUser?.email;

  useEffect(() => {
    fetchFavoriteRecipes();
    fetchImportedRecipes();
  }, []);

  const fetchFavoriteRecipes = async () => {
    try {
      const response = await fetch(`${API_URL}/favorites/user/${userEmail}`);
      if (!response.ok) {
        throw new Error('Failed to fetch favorite recipes');
      }
      const data = await response.json();
      setFavoriteRecipes(data);
    } catch (error) {
      console.error('Error fetching favorite recipes:', error.message);
    }
  };

  const fetchImportedRecipes = async () => {
    try {
      const response = await fetch(
        `${API_URL}/importedRecipes?email=${userEmail}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch imported recipes');
      }
      const data = await response.json();
      setImportedRecipes(data);
    } catch (error) {
      console.error('Error fetching imported recipes:', error.message);
    }
  };

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
          : importedRecipes.map(recipe => (
              <TouchableOpacity
                key={recipe._id}
                onPress={() => handleRecipePress(recipe._id, true)}
                style={styles.recipeItem}>
                <Text style={styles.recipeName}>{recipe.name}</Text>
              </TouchableOpacity>
            ))}
      </ScrollView>
    </View>
  );
};

export default YourRecipes;
