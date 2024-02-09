import React, {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {auth} from '../firebase';
import {SPOON_KEY} from '@env';
import {signOut} from 'firebase/auth';
import styles from './styles/account';
import {useNavigation} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wastedItems, setWastedItems] = useState([]);
  const [consumedItems, setConsumedItems] = useState([]);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);

  const userEmail = auth.currentUser?.email;
  const firstName = auth.currentUser?.displayName;
  const navigation = useNavigation();

  const API_URL = 'https://flavr-413021.ue.r.appspot.com/';

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
      <TouchableOpacity
        onPress={() => handleSelectRecipe(item.recipeId)}
        style={styles.recipeItem}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText}>{item.recipeName}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  useFocusEffect(
    React.useCallback(() => {
      if (userEmail) {
        const fetchUserData = async () => {
          try {
            setLoading(true);
            const response = await fetch(
              `${API_URL}/users/data?email=${userEmail}`,
            );
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setUserData(data);

            await fetchItemsData(userEmail);
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          } finally {
            setLoading(false);
          }
        };

        const fetchItemsData = async emailString => {
          try {
            const response = await fetch(
              `${API_URL}/items/useremail/${emailString}`,
            );
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const res = await response.json();
            setWastedItems(res.wastedItems);
            setConsumedItems(res.consumedItems);
          } catch (error) {
            console.error('Error fetching items data:', error.message);
          }
        };

        fetchUserData();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <AntDesignIcon name="user" size={50} color="black" />
            <Text style={styles.titleText}>{userData?.firstName}</Text>
            <Text style={styles.item}>
              Total Items Logged: {userData?.itemsCreated}
            </Text>
          </View>
          <View style={styles.itemsList}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Top 5 Consumed Items</Text>
              <AntDesignIcon
                style={styles.headerIcon}
                name="like2"
                size={20}
                color="green"
              />
            </View>

            {consumedItems.slice(0, 5).map(item => (
              <Text key={item._id} style={styles.item}>
                {item.name} ({item.frequency})
              </Text>
            ))}
          </View>
          {/* <View style={styles.itemsList}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Top 5 Consumed Items</Text>
              <AntDesignIcon
                style={styles.headerIcon}
                name="like2"
                size={20}
                color="green"
              />
            </View>

            {consumedItems.slice(0, 5).map(item => (
              <Text key={item._id} style={styles.item}>
                {item.name} ({item.frequency})
              </Text>
            ))}
          </View> */}
          <View style={styles.itemsList}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Top 5 Wasted Items</Text>

              <AntDesignIcon
                style={styles.headerIcon}
                name="dislike2"
                size={20}
                color="red"
              />
            </View>

            {wastedItems.slice(0, 5).map(item => (
              <Text key={item._id} style={styles.item}>
                {item.name} ({item.frequency})
              </Text>
            ))}
          </View>
          {/* <View style={styles.headerText}>
            <Text style={styles.titleText}>
              Favorite Recipes ({favoritedRecipes.length})
            </Text>
          </View>

          <FlatList
            windowSize={10}
            style={styles.itemsList}
            data={favoritedRecipes}
            renderItem={renderRecipeItem}
          /> */}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleLogout}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default Account;
