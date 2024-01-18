import React from 'react';
import {Text, Image, ScrollView} from 'react-native';
import styles from './styles/recipeDetails';

const RecipeDetails = ({route}) => {
  const {recipe} = route.params;

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
      <Text style={styles.servingsText}>Servings: {recipe.servings}</Text>

      <Text style={styles.ingredientsTitleText}>Ingredients:</Text>
      {recipe.extendedIngredients.map((ingredient, index) => (
        <Text key={index} style={styles.ingredientsText}>
          {ingredient.original}
        </Text>
      ))}

      {hasInstructions ? (
        <>
          <Text style={styles.instructionsTitleText}>Instructions:</Text>
          {recipe.analyzedInstructions[0].steps.map((step, index) => (
            <Text key={index} style={styles.instructionsText}>
              {index + 1}. {step.step}
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
