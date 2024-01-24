import React, {useEffect, useState} from 'react';
import {Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {auth} from '../firebase';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import styles from './styles/recipeDetails';

const API_URL =
  'https://616d-2600-4041-54c4-7200-b8e2-be63-2ed3-884b.ngrok-free.app';

const RecipeDetails = ({route}) => {
  const {recipe, selectedIngredients} = route.params; // Get selectedIngredients from params
  const [isFavorited, setIsFavorited] = useState(false);

  const userEmail = auth.currentUser?.email;

  useEffect(() => {
    checkIfFavorited();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const highlightMatchingWords = (text, keywords) => {
    if (!keywords) {
      // If keywords are not provided, return the original text
      return text;
    }

    const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
    return text.split(regex).map((part, index) => {
      if (keywords.includes(part.toLowerCase())) {
        return (
          <Text key={index} style={{color: 'red'}}>
            {part}
          </Text>
        );
      } else {
        return part;
      }
    });
  };

  const checkIfFavorited = async () => {
    try {
      const response = await fetch(
        `${API_URL}/favorites/isFavorited?recipeId=${recipe.id}&user=${userEmail}`,
      );
      if (!response.ok) {
        throw new Error('Failed to check favorite status');
      }
      const data = await response.json();
      setIsFavorited(data.isFavorited);
    } catch (error) {
      console.error('Error checking favorite status:', error.message);
    }
  };

  // const toggleFavorite = () => {
  //   setIsFavorited(!isFavorited);
  // };

  const toggleFavoriteRecipe = async () => {
    try {
      const response = await fetch(`${API_URL}/favorites/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeId: recipe.id,
          recipeName: recipe.title,
          user: userEmail,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Body: ${errorBody}`,
        );
      }

      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error('Error toggling favorite recipe:', error.message);
    }
  };

  const hasInstructions =
    recipe.analyzedInstructions &&
    recipe.analyzedInstructions.length > 0 &&
    recipe.analyzedInstructions[0].steps &&
    recipe.analyzedInstructions[0].steps.length > 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 50}}>
      <Text style={styles.titleText}>{recipe.title}</Text>
      <Image source={{uri: recipe.image}} style={styles.image} />
      <TouchableOpacity
        onPress={toggleFavoriteRecipe}
        style={styles.favoriteButton}>
        <AntDesignIcon
          name={isFavorited ? 'heart' : 'hearto'}
          size={24}
          color={isFavorited ? 'red' : 'black'}
        />
        <Text style={styles.favoriteText}>
          {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.servingsText}>Servings: {recipe.servings}</Text>

      <Text style={styles.ingredientsTitleText}>Ingredients:</Text>
      {recipe.extendedIngredients.map((ingredient, index) => (
        <Text key={index} style={styles.ingredientsText}>
          {highlightMatchingWords(
            ingredient.original,
            selectedIngredients
              ? selectedIngredients.map(i => i.toLowerCase())
              : [],
          )}
        </Text>
      ))}

      {hasInstructions ? (
        <>
          <Text style={styles.instructionsTitleText}>Instructions:</Text>
          {recipe.analyzedInstructions[0].steps.map((step, index) => (
            <Text key={index} style={styles.instructionsText}>
              {index + 1}.{' '}
              {highlightMatchingWords(
                step.step,
                selectedIngredients
                  ? selectedIngredients.map(i => i.toLowerCase())
                  : [],
              )}
            </Text>
          ))}
        </>
      ) : (
        <Text style={styles.instructionsText}>No instructions available.</Text>
      )}
    </ScrollView>
  );
};

export default RecipeDetails;
