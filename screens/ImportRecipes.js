import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import {auth} from '../firebase';
import {API_URL} from '@env';
import {UserContext} from '../contexts/UserContext';
import styles from './styles/importRecipes';
import pluralize from 'pluralize';

const ImportRecipes = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);

  const userEmail = auth.currentUser?.email;
  const {items, pantryItems, setImportedRecipes} = useContext(UserContext);

  const highlightUserItems = (text, userItems) => {
    if (!userItems || typeof text !== 'string') {
      return text;
    }

    const keywordVariations = userItems.flatMap(item => [
      item,
      pluralize.singular(item),
      pluralize.plural(item),
    ]);

    const uniqueKeywordVariations = [...new Set(keywordVariations)];

    const regex = new RegExp(
      `\\b(${uniqueKeywordVariations.join('|')})\\b`,
      'gi',
    );
    return text.split(regex).map((part, index) => {
      if (uniqueKeywordVariations.includes(part.toLowerCase())) {
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

  const highlightPantryItems = (text, pantryItems) => {
    if (!pantryItems || typeof text !== 'string') {
      return text;
    }

    const keywordVariations = pantryItems.flatMap(item => [
      item,
      pluralize.singular(item),
      pluralize.plural(item),
    ]);

    const uniqueKeywordVariations = [...new Set(keywordVariations)];

    const regex = new RegExp(
      `\\b(${uniqueKeywordVariations.join('|')})\\b`,
      'gi',
    );
    return text.split(regex).map((part, index) => {
      if (uniqueKeywordVariations.includes(part.toLowerCase())) {
        return (
          <Text key={index} style={styles.blueText}>
            {part}
          </Text>
        );
      } else {
        return part;
      }
    });
  };

  const handleParseUrl = async () => {
    setLoading(true);
    setRecipe(null);
    try {
      const response = await fetch(`${API_URL}/parseRecipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({url}),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setRecipe(data.recipe);
        } else {
          Alert.alert('Error', 'Failed to parse recipe');
        }
      } else {
        console.error('Failed to parse recipe');
        Alert.alert('Error', 'Failed to parse recipe');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while parsing the recipe');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = async () => {
    if (!userEmail) {
      Alert.alert('Error', 'User not logged in');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/saveRecipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({recipe, userEmail}),
      });

      if (response.ok) {
        Alert.alert('Success', 'Recipe saved successfully');
        setImportedRecipes(prev => [...prev, recipe]);
      } else {
        const errorData = await response.json();
        console.error('Failed to save recipe:', errorData.message);
        Alert.alert('Error', `Failed to save recipe: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error',
        `An error occurred while saving the recipe: ${error.message}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Recipe URL:</Text>
      <TextInput
        style={styles.input}
        value={url}
        onChangeText={setUrl}
        placeholder="https://www.example.com/recipe"
        placeholderTextColor={'gray'}
      />
      <Button title="Parse URL" onPress={handleParseUrl} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading && recipe ? (
        <ScrollView
          style={styles.recipeContainer}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.textContainer}>
            <View style={{paddingHorizontal: 2}}>
              <Text style={styles.title}>{recipe.name}</Text>
            </View>

            <View style={styles.ingredientsContainer}>
              <Text style={styles.ingredientsTitle}>Description</Text>
              <Text style={styles.ingredientsText}>{recipe.description}</Text>
            </View>

            <View style={styles.ingredientsContainer}>
              <Text style={styles.ingredientsTitle}>Ingredients</Text>
              {recipe.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.ingredientsText}>
                  {'\u2023 '}
                  {highlightPantryItems(
                    highlightUserItems(
                      ingredient,
                      items.map(item => item.name.toLowerCase()),
                    ),
                    pantryItems.map(item => item.itemName.toLowerCase()),
                  )}
                </Text>
              ))}
            </View>

            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsTitle}>Instructions</Text>
              {recipe.instructions.map((instruction, index) => (
                <Text key={index} style={styles.instructionsText}>
                  {index + 1}. {instruction}
                </Text>
              ))}
            </View>
          </View>
          <Button title="Import Recipe" onPress={handleSaveRecipe} />
        </ScrollView>
      ) : null}
    </View>
  );
};

export default ImportRecipes;
