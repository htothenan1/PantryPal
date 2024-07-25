import React, {useEffect, useState} from 'react';
import {Text, Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {API_URL} from '@env';
import {auth} from '../firebase';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';

import styles from './styles/recipeDetails';

const RecipeDetails = ({route}) => {
  const {recipe, selectedIngredients} = route.params;
  const [isFavorited, setIsFavorited] = useState(false);

  const userEmail = auth.currentUser?.email;
  const {width} = useWindowDimensions();

  useEffect(() => {
    checkIfFavorited();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const highlightMatchingWords = (text, keywords) => {
    if (!keywords) {
      return text;
    }

    const regex = new RegExp(`\\b(${keywords.join('|')})(s?)\\b`, 'gi');
    return text.split(regex).map((part, index) => {
      if (keywords.includes(part.toLowerCase())) {
        return (
          <Text key={index} style={styles.redText}>
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

  const tagsStyles = {
    a: {
      color: 'blue',
      textDecorationLine: 'none',
    },
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Image source={{uri: recipe.image}} style={styles.image} />
      <View style={styles.textContainer}>
        <View style={{paddingHorizontal: 2}}>
          <Text style={styles.titleText}>{recipe.title}</Text>
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
          <Text style={styles.servingsText}>{recipe.servings} Servings</Text>
          <Text style={styles.servingsText}>
            Ready in {recipe.readyInMinutes} minutes
          </Text>
        </View>

        <View style={styles.ingredientsContainer}>
          <Text style={styles.ingredientsTitleText}>Ingredients</Text>
          {recipe.extendedIngredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredientsText}>
              {'\u2023 '}
              {highlightMatchingWords(
                ingredient.original,
                selectedIngredients
                  ? selectedIngredients.map(i => i.toLowerCase())
                  : [],
              )}
            </Text>
          ))}
        </View>
        {hasInstructions ? (
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitleText}>Instructions</Text>
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
          </View>
        ) : (
          <Text style={styles.instructionsText}>
            No instructions available.
          </Text>
        )}

        <View style={styles.ingredientsContainer}>
          <Text style={styles.ingredientsTitleText}>Summary</Text>
          <RenderHtml
            baseStyle={{
              fontSize: 15,
              lineHeight: 20,
              fontFamily: 'Avenir-Book',
            }}
            contentWidth={width}
            source={{html: recipe.summary}}
            tagsStyles={tagsStyles}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipeDetails;
