import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  FlatList,
} from 'react-native';
// import {ingredients} from './data/ingredients';
import {auth} from '../firebase';
import {signOut} from 'firebase/auth';
import {SPOON_KEY} from '@env';
import styles from './styles/account';
import {useNavigation} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import appleIcon from '../assets/apple_icon.png';
import avoIcon from '../assets/avo_icon.png';
import bellpepperIcon from '../assets/bellpepper_icon.png';
import broccoliIcon from '../assets/broccoli_icon.png';
import onionIcon from '../assets/onion_icon.png';

const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};

const icons = [
  {
    item_id: '987d41b6-711e-41f9-bc1c-7919eef1ef54',
    name: 'Ruby',
    img: appleIcon,
  },
  {
    item_id: '9g7d41g6-7g1e-4gf9-bc1c-7919egf1efg4',
    name: 'Hass',
    img: avoIcon,
  },
  {
    item_id: '987df1b6-7f1e-4ff9-bcwc-7919ewf1ew54',
    name: 'Peppy',
    img: bellpepperIcon,
  },
  {
    item_id: '987d41b6-711e-41f9-bc1c-7919eef1ef54',
    name: 'Brock',
    img: broccoliIcon,
  },
  {
    item_id: '987d41b6-711e-41f9-bc1c-7919eef1ef54',
    name: 'Ollie',
    img: onionIcon,
  },
];

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wastedItems, setWastedItems] = useState([]);
  const [consumedItems, setConsumedItems] = useState([]);
  const [isIconPickerVisible, setIconPickerVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const userEmail = auth.currentUser?.email;
  const navigation = useNavigation();

  const API_URL = 'https://flavr-413021.ue.r.appspot.com/';

  const onViewRef = useRef(({changed}) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const renderItems = ({item}) => {
    const title = 'recipe';

    return (
      <TouchableOpacity
        // onPress={() => navToArticleDetails(item)}
        activeOpacity={1}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.footerText}>{title}</Text>
      </TouchableOpacity>
    );
  };

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
      // console.log(favoritedRecipes);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const updateIconName = async selectedIconName => {
    try {
      const response = await fetch(`${API_URL}/users/icon`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          iconName: selectedIconName,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
    } catch (error) {
      console.error('Error updating icon name:', error);
    }
  };

  useEffect(() => {
    if (userData?.iconName) {
      const foundIcon = icons.find(
        icon => icon.name === userData.iconName,
      )?.img;
      if (foundIcon) {
        setSelectedIcon(foundIcon);
      } else {
        console.log('Icon not found:', userData.iconName);
      }
    }
  }, [userData]);

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
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#495057" />
      ) : (
        <ScrollView>
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <TouchableOpacity onPress={() => setIconPickerVisible(true)}>
              {selectedIcon ? (
                <Image
                  source={selectedIcon}
                  style={{width: 100, height: 100, resizeMode: 'stretch'}}
                />
              ) : (
                <View style={{marginTop: 10}}>
                  <AntDesignIcon name="user" size={50} color="black" />
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{userData?.firstName}</Text>
              <Text style={styles.levelText}>Level 1</Text>
              <Text style={styles.item}>
                Total Items Logged: {userData?.itemsCreated}
              </Text>
            </View>
          </View>
          {/* <Text style={styles.titleText}>Latest Articles</Text>
          <View style={styles.dashContainer}>
            <FlatList
              data={favoritedRecipes}
              renderItem={renderItems}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={true}
              pagingEnabled
              ref={ref => {
                flatListRef.current = ref;
              }}
              viewabilityConfig={viewConfigRef}
              onViewableItemsChanged={onViewRef.current}
            />
          </View> */}

          {/* <View style={styles.headerText}>
            <Text style={styles.titleText}>
              Favorite Recipes ({favoritedRecipes.length})
            </Text>
          </View>

          <FlatList
            windowSize={10}
            style={styles.recipesList}
            data={favoritedRecipes}
            // keyExtractor={item => item.id.toString()}
            renderItem={renderRecipeItem}
          /> */}

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

          <Modal
            visible={isIconPickerVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIconPickerVisible(false)}>
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setIconPickerVisible(false)}
              activeOpacity={1}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitleText}>Choose your Icon</Text>
                <ScrollView>
                  {icons.map((icon, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedIcon(icon.img);
                        updateIconName(icon.name);
                        setIconPickerVisible(false);
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                      }}>
                      <Image
                        source={icon.img}
                        style={{
                          width: 40,
                          height: 40,
                          marginRight: 10,
                        }}
                      />
                      <Text>{icon.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      )}
      <View style={styles.startButton}>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Account;
