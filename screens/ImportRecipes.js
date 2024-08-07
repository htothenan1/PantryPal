import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import {auth} from '../firebase';
import {API_URL} from '@env';
import {UserContext} from '../contexts/UserContext';
import chefLogo from '../assets/chefs_hat.png';

const ImportRecipes = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);

  const userEmail = auth.currentUser?.email;
  const {setImportedRecipes} = useContext(UserContext);

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
      />
      <Button title="Parse URL" onPress={handleParseUrl} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading && recipe ? (
        <ScrollView
          style={styles.recipeContainer}
          contentContainerStyle={styles.contentContainer}>
          {/* <Image source={chefLogo} style={styles.image} /> */}
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
                  {ingredient}
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // paddingBottom: 100,
    flex: 1,
    backgroundColor: 'white',
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
  contentContainer: {
    paddingBottom: 50,
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Avenir-Book',
  },
  image: {
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  ingredientsContainer: {
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
    backgroundColor: '#EDF2F4',
  },
  ingredientsTitle: {
    fontSize: 18,
    fontFamily: 'Avenir-Book',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  ingredientsText: {
    fontFamily: 'Avenir-Book',
    fontSize: 16,
    marginVertical: 1,
  },
  instructionsContainer: {
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
    backgroundColor: '#EDF2F4',
  },
  instructionsTitle: {
    fontSize: 18,
    fontFamily: 'Avenir-Book',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  instructionsText: {
    fontFamily: 'Avenir-Book',
    fontSize: 16,
    marginVertical: 1,
  },
});

export default ImportRecipes;
