/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Text, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {API_URL, SPOON_KEY} from '@env';
import {auth} from '../firebase';
import styles from './styles/favoriteRecipes';

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const navigation = useNavigation();
  const userEmail = auth.currentUser?.email;

  useEffect(() => {
    fetchFavoriteRecipes();
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

  const handleRecipePress = async recipeId => {
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
  };

  return (
    <ScrollView style={styles.container}>
      {favoriteRecipes.map(recipe => (
        <TouchableOpacity
          key={recipe._id}
          onPress={() => handleRecipePress(recipe.recipeId)}
          style={styles.recipeItem}>
          <Text style={styles.recipeName}>{recipe.recipeName}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FavoriteRecipes;
