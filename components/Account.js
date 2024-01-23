import React, {useState} from 'react';
import {
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {auth} from '../firebase';
import {SPOON_KEY} from '@env';
import {signOut} from 'firebase/auth';
import styles from './styles/account';
import {useNavigation} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';
import {View} from 'react-native';

const Account = () => {
  const [loading, setLoading] = useState(true);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);

  const userEmail = auth.currentUser?.email;
  const navigation = useNavigation();

  const API_URL =
    'https://616d-2600-4041-54c4-7200-b8e2-be63-2ed3-884b.ngrok-free.app';

  const fetchFavoritedRecipes = async () => {
    if (!userEmail) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/favorites/user/${userEmail}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFavoritedRecipes(data);
    } catch (error) {
      console.error('Error fetching favorited recipes:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRecipe = async data => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${data}/information?apiKey=${SPOON_KEY}&includeNutrition=false`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const recipe = await response.json();
      navigation.navigate('RecipeDetails', {recipe});
    } catch (error) {
      console.error('Error fetching recipe information:', error.message);
    }
  };

  const renderRecipeItem = ({item}) => {
    return (
      //   <TouchableOpacity onPress={() => handleSelectRecipe(item.recipeId)}>
      //     <Text style={styles.recipeItem}>{item.recipeName}</Text>
      //   </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleSelectRecipe(item.recipeId)}
        style={styles.item}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText}>{item.recipeName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchFavoritedRecipes();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container} contentContainerStyle={{paddingBottom: 50}}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <View style={styles.headerText}>
            <Text style={styles.titleText}>
              Your Favs ({favoritedRecipes.length})
            </Text>
          </View>

          <FlatList
            windowSize={10}
            style={styles.itemsList}
            data={favoritedRecipes}
            // keyExtractor={item => item.id.toString()}
            renderItem={renderRecipeItem}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleLogout}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Account;
