/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {auth} from '../firebase';
import {signOut} from 'firebase/auth';
import {API_URL} from '@env';
import {capitalizeWords} from './helpers/functions';
import {UserContext} from '../contexts/UserContext';
import {useNavigation} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {onboardingModule} from './data/modules';
import foodbankicon from '../assets/foodbankicon.png';
import {ingredients} from './data/ingredients';
import styles from './styles/account';

const Account = () => {
  const {userData, fetchUserData} = useContext(UserContext);
  const [wastedItems, setWastedItems] = useState([]);
  const [showWastedItems, setShowWastedItems] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(wastedItems.length / 5);

  const getPageItems = () => {
    const startIdx = currentPage * 5;
    const endIdx = startIdx + 5;
    return wastedItems.slice(startIdx, endIdx);
  };

  const userEmail = auth.currentUser?.email;
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      if (userEmail) {
        fetchUserData(userEmail);
        fetchItemsData(userEmail);
      }
    }, [userEmail]),
  );

  const fetchItemsData = async emailString => {
    try {
      const response = await fetch(`${API_URL}/items/useremail/${emailString}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const res = await response.json();
      setWastedItems(res.wastedItems);
    } catch (error) {
      console.error('Error fetching items data:', error.message);
    }
  };

  const navToOnboardingStack = module => {
    navigation.navigate('OnboardingStack', {
      screen: 'OnboardingStartScreen',
      params: {module: module[0]},
    });
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Confirm Account Deletion',
      'Are you sure you want to permanently delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const authUser = auth.currentUser;
              if (!authUser) {
                throw new Error('No authenticated user found.');
              }

              const userId = authUser.uid;

              await authUser.delete();

              const response = await fetch(`${API_URL}/users/${userId}`, {
                method: 'DELETE',
              });

              if (!response.ok) {
                throw new Error('Failed to delete user from MongoDB.');
              }

              console.log(
                'User successfully deleted from Firebase and MongoDB',
              );

              await signOut(auth);

              navigation.replace('Login');
            } catch (error) {
              if (error.code === 'auth/requires-recent-login') {
                Alert.alert(
                  'Reauthentication Required',
                  'Please log in again to delete your account.',
                );
              } else {
                console.error('Error deleting account:', error);
                Alert.alert(
                  'Error',
                  'Failed to delete your account. Please try again.',
                );
              }
            }
          },
        },
      ],
    );
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getIconForItem = itemName => {
    const ingredient = ingredients.find(
      ingredient => ingredient.name.toLowerCase() === itemName.toLowerCase(),
    );
    return ingredient ? ingredient.img : null;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.accountInfoWrapper}>
          <View>
            <Image source={foodbankicon} style={styles.accountImage} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{userData?.firstName}</Text>
            <Text style={styles.levelText}>{userData?.email}</Text>
          </View>
        </View>

        <View style={styles.preferencesContainer}>
          <TouchableOpacity
            style={styles.favoriteRecipesButton}
            onPress={() => navigation.navigate('Your Recipes')}>
            <Text style={styles.pantryButtonText}>Saved Recipes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteRecipesButton}
            onPress={() => navigation.navigate('Import Recipes')}>
            <Text style={styles.pantryButtonText}>Recipe Importer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.compostGameButton}
            onPress={() => navigation.navigate('Compost Game')}>
            <Text style={styles.compostGameText}>Compost Game</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.compostGameButton}
            onPress={() => navToOnboardingStack(onboardingModule)}>
            <Text style={styles.compostGameText}>How to use FeedLink</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.itemsList}>
          <TouchableOpacity
            onPress={() => setShowWastedItems(!showWastedItems)}
            style={styles.headerContainer}>
            <Text style={styles.headerText}>Waste History</Text>
            <AntDesignIcon
              style={styles.headerIcon}
              name={showWastedItems ? 'caretup' : 'caretdown'}
              size={20}
              color="#B22222"
            />
          </TouchableOpacity>

          {showWastedItems && (
            <View style={styles.paginationContainer}>
              {currentPage > 0 && (
                <TouchableOpacity
                  onPress={() => setCurrentPage(currentPage - 1)}>
                  <Text style={styles.paginationText}>Previous Page</Text>
                </TouchableOpacity>
              )}
              {currentPage < totalPages - 1 && (
                <TouchableOpacity
                  onPress={() => setCurrentPage(currentPage + 1)}>
                  <Text style={styles.paginationText}>Next Page</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          {showWastedItems &&
            getPageItems().map(item => (
              <View key={item._id} style={styles.itemContainer}>
                <Image
                  source={getIconForItem(item.name)}
                  style={styles.itemIcon}
                />
                <View>
                  <Text style={styles.itemText}>
                    {capitalizeWords(item.name)} on{' '}
                    {new Date(item.dateCreated).toLocaleDateString('en-US', {
                      month: 'numeric',
                      day: 'numeric',
                    })}
                  </Text>

                  <Text style={styles.reasonText}>
                    {item.reason || 'No reason specified'}
                  </Text>
                </View>
              </View>
            ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteAccountButton}
          onPress={handleDeleteAccount}>
          <Text style={styles.deleteAccountButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Account;
