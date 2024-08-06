import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {auth} from '../firebase';
import {API_URL} from '@env';

const ImportRecipes = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);

  const userEmail = auth.currentUser?.email;

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
      />
      <Button title="Parse URL" onPress={handleParseUrl} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading && recipe ? (
        <ScrollView style={styles.recipeContainer}>
          <Text style={styles.title}>Recipe: {recipe.name}</Text>
          <Text style={styles.text}>Description: {recipe.description}</Text>
          <Text style={styles.subTitle}>Ingredients:</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.text}>
              {ingredient}
            </Text>
          ))}
          <Text style={styles.subTitle}>Instructions:</Text>
          {recipe.instructions.map((instruction, index) => (
            <Text key={index} style={styles.text}>
              {instruction}
            </Text>
          ))}
          <Button title="Save to Your Recipes" onPress={handleSaveRecipe} />
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    paddingBottom: 100,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  recipeContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default ImportRecipes;
