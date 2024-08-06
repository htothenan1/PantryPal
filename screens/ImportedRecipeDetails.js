import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import chefLogo from '../assets/chefs_hat.png';
import styles from './styles/importedRecipeDetails';

const ImportedRecipeDetails = ({route}) => {
  const {recipe} = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Image source={chefLogo} style={styles.image} />
      <View style={styles.textContainer}>
        <View style={{paddingHorizontal: 2}}>
          <Text style={styles.titleText}>{recipe.name}</Text>
          {/* <Text style={styles.servingsText}>{recipe.yield} servings</Text>
          <Text style={styles.servingsText}>{recipe.totalTime}</Text> */}
        </View>

        <View style={styles.ingredientsContainer}>
          <Text style={styles.ingredientsTitleText}>Description</Text>
          <Text style={styles.ingredientsText}>{recipe.description}</Text>
        </View>

        <View style={styles.ingredientsContainer}>
          <Text style={styles.ingredientsTitleText}>Ingredients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredientsText}>
              {'\u2023 '}
              {ingredient}
            </Text>
          ))}
        </View>

        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitleText}>Instructions</Text>
          {recipe.instructions.map((instruction, index) => (
            <Text key={index} style={styles.instructionsText}>
              {index + 1}. {instruction}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ImportedRecipeDetails;
