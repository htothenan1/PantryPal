import React from 'react';
import {Text, Image, ScrollView} from 'react-native';
import styles from './styles/recipeDetails';

const RecipeDetails = ({route}) => {
  const {recipe} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>{recipe.title}</Text>
      <Image source={{uri: recipe.image}} style={styles.image} />
      <Text style={styles.servingsText}>Servings: {recipe.servings}</Text>

      <Text style={styles.ingredientsTitleText}>Ingredients:</Text>
      {recipe.extendedIngredients.map((ingredient, index) => (
        <Text key={index} style={styles.ingredientsText}>
          {ingredient.original}
        </Text>
      ))}

      <Text style={styles.instructionsTitleText}>Instructions:</Text>
      {recipe.analyzedInstructions[0].steps.map((step, index) => (
        <Text key={index} style={styles.instructionsText}>
          {step.step}
        </Text>
      ))}
    </ScrollView>
  );
};

export default RecipeDetails;
