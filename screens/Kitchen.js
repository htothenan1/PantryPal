/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import UserHeader from '../components/UserHeader';
// import UserProgressBar from '../components/UserProgressBar';
import {UserContext} from '../contexts/UserContext';
import {Swipeable} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';
import Modal from 'react-native-modal';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {auth} from '../firebase';
import {ingredients} from './data/ingredients';
import {icons} from './data/icons';
import {itemNames} from './data/itemNames';
import {
  IconToolsKitchen2,
  IconFridge,
  IconHourglassEmpty,
  IconCalendarClock,
  IconShoppingCart,
  IconChefHat,
} from '@tabler/icons-react-native';

import {
  capitalizeWords,
  findIngredient,
  calculateAvailableCategories,
  calculateDaysUntilExpiration,
  getBackgroundColor,
} from '../screens/helpers/functions';
import {API_URL} from '@env';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {onboardingModule} from './data/modules';
import styles from './styles/kitchen';
import DatePicker from 'react-native-date-picker';
import chefLogo from '../assets/chefs_hat.png';
import foodbankicon from '../assets/foodbankicon.png';

const Kitchen = ({route}) => {
  const {userData, items, setItems, fetchItems, fetchUserData, loading} =
    useContext(UserContext);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const swipeableRefs = useRef(new Map()).current;
  const [isAddItemModalVisible, setAddItemModalVisible] = useState(false);
  const [isBadReviewModalVisible, setBadReviewModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [isItemsLoading, setIsItemsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState(items);
  const [availableCategories, setAvailableCategories] = useState(['all']);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [input, setInput] = useState('');
  const [boxInput, setBoxInput] = useState('');
  const [filteredItemNames, setFilteredItemNames] = useState([]);
  const [isDeletingAllItems, setIsDeletingAllItems] = useState(false);
  const [isBoxItemsLoading, setIsBoxItemsLoading] = useState(false);
  const [currentItemToDelete, setCurrentItemToDelete] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);

  const userEmail = auth.currentUser?.email;
  const navigation = useNavigation();

  useEffect(() => {
    if (input.trim() === '') {
      setFilteredItemNames([]);
    } else {
      const filtered = itemNames.filter(item =>
        item.startsWith(input.toLowerCase()),
      );
      setFilteredItemNames(filtered);
    }
  }, [input]);

  useEffect(() => {
    const categories = calculateAvailableCategories(items);
    setAvailableCategories(categories);
  }, [items]);

  useEffect(() => {
    setIsItemsLoading(true);
    fetchItems(userEmail);
  }, []);

  // useEffect(() => {
  //   const checkOnboarding = async () => {
  //     const hasCompletedOnboarding = await AsyncStorage.getItem(
  //       `hasCompletedOnboarding-${userEmail}`,
  //     );

  //     if (!hasCompletedOnboarding) {
  //       navigation.navigate('OnboardingStack', {
  //         screen: 'OnboardingStartScreen',
  //         params: {module: onboardingModule[0]},
  //       });
  //     }
  //   };

  //   checkOnboarding();
  // }, []);

  useEffect(() => {
    filterItemsByCategory();
  }, [items, currentCategory]);

  useEffect(() => {
    if (userEmail) {
      fetchUserData(userEmail);
    }
  }, []);

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
      const unsubscribe = navigation.addListener('focus', () => {
        if (route.params?.itemsAdded) {
          fetchItems(userEmail);

          if (userEmail) {
            fetchUserData(userEmail);
          }

          navigation.setParams({itemsAdded: false});
        }
      });

      return unsubscribe;
    }, [navigation, route.params?.itemsAdded]),
  );

  const fetchFoodBoxByCode = async boxCode => {
    try {
      setIsBoxItemsLoading(true);
      const response = await fetch(
        `${API_URL}/foodBox/${boxCode.toUpperCase()}`,
      );

      if (response.ok) {
        const foodBox = await response.json();
        return foodBox;
      } else {
        throw new Error('FeedLink code not found');
      }
    } catch (error) {
      console.error('Error fetching feeedlink code:', error.message);
      Alert.alert('Error', 'Feedlink code not found');
      return null;
    } finally {
      setIsBoxItemsLoading(false);
    }
  };

  const filterItemsByCategory = () => {
    if (currentCategory === 'all') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => {
        const ingredient = findIngredient(item.name);
        return ingredient && ingredient.category === currentCategory;
      });
      setFilteredItems(filtered);
    }
  };

  // const renderFoodItem = ({item}) => {
  //   const ingredient = findIngredient(item);
  //   const itemImage = ingredient ? ingredient.img : chefLogo;

  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         setInput(item);
  //         setFilteredItemNames([]);
  //       }}
  //       style={styles.singleAddItem}>
  //       <Image source={itemImage} style={styles.singleAddItemIcon} />
  //       <Text>{capitalizeWords(item)}</Text>
  //     </TouchableOpacity>
  //   );
  // };

  const deleteItem = async (itemId, method, reason) => {
    setDeletingItemId(itemId);

    try {
      // Fetch the item to check if it's a food box item
      const itemResponse = await fetch(`${API_URL}/items/${itemId}`);
      if (!itemResponse.ok) {
        throw new Error('Item not found');
      }

      const itemData = await itemResponse.json();
      const isFoodBoxItem = itemData.isFoodBoxItem;

      // Prepare payload for the delete request
      const deletePayload = {
        method, // either 'consume' or 'waste'
        isFoodBoxItem, // Check if it's part of a food box
        foodBoxId: isFoodBoxItem ? itemData.foodBoxId : null, // Store the food box ID if applicable
        reason,
      };

      // Send the delete request with the necessary details
      const response = await fetch(
        `${API_URL}/items/${itemId}?method=${method}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(deletePayload), // Include the payload in the body
        },
      );

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Problem deleting item: Status ${response.status}, Body: ${errorBody}`,
        );
      }

      const data = await response.json();
      if (data.levelChanged) {
        Alert.alert(
          'Congratulations!',
          `You've reached level ${data.newLevel}!`,
        );
      }

      // Update the state to remove the deleted item from the list
      setItems(currentItems =>
        currentItems.filter(item => item._id !== itemId),
      );

      // Fetch updated user data
      fetchUserData(userEmail);
    } catch (error) {
      console.error('Error deleting item:', error.message);
    } finally {
      setDeletingItemId(null);
    }
  };

  const confirmDeleteAll = () => {
    Alert.alert(
      'Delete All Items',
      'Are you sure you want to delete all items? This will not affect your Waste History.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Deletion cancelled'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteAllItems()},
      ],
      {cancelable: false},
    );
  };

  const deleteAllItems = async () => {
    if (!userEmail) {
      console.error('User email is not provided');
      return;
    }

    setIsDeletingAllItems(true);

    try {
      const response = await fetch(`${API_URL}/items/deleteAll/${userEmail}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchItems(userEmail);
    } catch (error) {
      console.error('Error deleting items:', error.message);
    } finally {
      setIsDeletingAllItems(false);
    }
  };

  async function addCustomItem(itemName) {
    setIsLoading(true);
    try {
      if (!itemName) {
        throw new Error('Item name is required');
      }

      const existingIngredient = ingredients.find(
        ingredient => ingredient.name === itemName.toLowerCase(),
      );

      let storageTip = 'Not available';
      let whyEat = 'Not available';
      let expInt = 6;

      if (existingIngredient) {
        storageTip = existingIngredient.storage_tip;
        expInt = existingIngredient.exp_int;
        whyEat = existingIngredient.whyEat;
      } else {
        const tipResponse = await fetch(`${API_URL}/generateStorageTip`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({item: itemName}),
        });

        if (!tipResponse.ok) {
          console.error(`HTTP error! Status: ${tipResponse.status}`);
        } else {
          const tipData = await tipResponse.json();
          storageTip = tipData.storageTip;
        }

        const healthFactResponse = await fetch(
          `${API_URL}/generateHealthFacts`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({item: itemName}),
          },
        );

        if (!healthFactResponse.ok) {
          console.error(`HTTP error! Status: ${healthFactResponse.status}`);
        } else {
          const healthFactData = await healthFactResponse.json();
          whyEat = healthFactData.healthFact;
        }
      }

      const newItem = {
        name: itemName,
        exp_int: expInt,
        storage_tip: storageTip,
        whyEat: whyEat,
        user: userEmail,
      };

      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [newItem],
          userEmail: userEmail,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Body: ${errorBody}`,
        );
      }

      const savedItems = await response.json();
      setItems(currentItems => [
        ...currentItems,
        ...(Array.isArray(savedItems) ? savedItems : [savedItems]),
      ]);

      setAddItemModalVisible(false);
      setNewItemName('');
      setInput('');
      fetchUserData(userEmail);
      fetchItems(userEmail);
    } catch (error) {
      console.error('Error adding custom item:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const logFoodBoxEntry = async (boxCode, userEmail) => {
    try {
      const response = await fetch(`${API_URL}/logFoodBox`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({code: boxCode, userEmail: userEmail}),
      });

      if (!response.ok) {
        throw new Error('Error logging food box entry');
      }

      console.log('Food box logged successfully');
    } catch (error) {
      console.error('Error logging food box entry:', error.message);
    }
  };

  const addFoodBoxItems = async boxInput => {
    setIsBoxItemsLoading(true);
    const foodBox = await fetchFoodBoxByCode(boxInput);

    if (foodBox) {
      const matchedItems = foodBox.items.map(itemName => {
        const matchedIngredient = ingredients.find(
          ingredient => ingredient.name === itemName,
        );
        return {
          name: itemName,
          exp_int: matchedIngredient?.exp_int || 6,
          storage_tip: matchedIngredient?.storage_tip || 'Not available',
          whyEat: matchedIngredient?.whyEat || 'Not available',
          user: userEmail,
          isFoodBoxItem: true, // Mark as food box item
          foodBoxId: foodBox.code, // Add foodBoxId
        };
      });

      try {
        const response = await fetch(`${API_URL}/items`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({items: matchedItems, userEmail}),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const savedItems = await response.json();
        setItems(currentItems => [
          ...currentItems,
          ...(Array.isArray(savedItems) ? savedItems : [savedItems]),
        ]);
        fetchUserData(userEmail);
        fetchItems(userEmail);
        setBoxInput('');

        // Handle response
      } catch (error) {
        console.error('Error adding items:', error.message);
      } finally {
        setIsLoading(false);
        setIsBoxItemsLoading(false);
      }
    }
  };

  const updateExpDate = async (item, newDate) => {
    setUpdatingItemId(item._id);
    const formattedDate = newDate.toISOString().split('T')[0];

    try {
      const url = `${API_URL}/items/${item._id}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({exp_date: formattedDate}),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          `Problem updating item expiration date: ${errorDetails}`,
        );
      }

      const data = await response.json();
      if (data.levelChanged) {
        Alert.alert(
          'Congratulations!',
          `You've reached level ${data.newLevel}!`,
        );
      }
      fetchItems(userEmail);
      fetchUserData(userEmail);
      setSelectedDate(new Date());
      const swipeable = swipeableRefs.get(item._id);
      if (swipeable) {
        swipeable.close();
      }
    } catch (error) {
      console.error('Error updating expiration date:', error.message);
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleUndo = data => {
    deleteItem(data._id, 'undo', 'none');
    const swipeable = swipeableRefs.get(data._id);
    if (swipeable) {
      swipeable.close();
    }
  };

  // const handleWaste = data => {
  //   // deleteItem(data._id, 'waste');
  //   console.log('trigger module');
  //   setBadReviewModalVisible(true);
  //   const swipeable = swipeableRefs.get(data._id);
  //   if (swipeable) {
  //     swipeable.close();
  //   }
  // };

  const handleWaste = item => {
    setCurrentItemToDelete(item);
    setBadReviewModalVisible(true);
  };

  const handleBadReviewOption = reason => {
    if (currentItemToDelete) {
      deleteItem(currentItemToDelete._id, 'waste', reason); // Pass the reason
    }
    setBadReviewModalVisible(false);
  };

  const handleConsume = data => {
    deleteItem(data._id, 'consume', 'none');
    const swipeable = swipeableRefs.get(data._id);
    if (swipeable) {
      swipeable.close();
    }
  };

  const renderRightActions = item => {
    return (
      <View style={styles.rightSwipeContainer}>
        {/* <TouchableOpacity
          onPress={() => handleUndo(item)}
          style={styles.swipeButton}>
          <AntDesignIcon name="delete" size={20} color="black" />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => handleWaste(item)}
          style={styles.swipeButton}>
          <AntDesignIcon name="dislike2" size={25} color="#B22222" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleConsume(item)}
          style={styles.swipeButton}>
          <AntDesignIcon name="like2" size={25} color="#228B22" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderLeftActions = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCurrentItem(item);
          setSelectedDate(new Date(item.exp_date));
          setOpen(true);
        }}
        style={styles.swipeButton}>
        <AntDesignIcon name="calendar" size={25} color="black" />
      </TouchableOpacity>
    );
  };

  const navToItemDetails = itemObject => {
    navigation.navigate('Item Details', {
      item: itemObject,
      userItems: items,
    });
  };

  const swipeItem = ({item}) => {
    const daysRemaining = calculateDaysUntilExpiration(item.exp_date);
    const backgroundColor = getBackgroundColor(daysRemaining);
    const ingredient = findIngredient(item.name);
    const itemImage = ingredient ? ingredient.img : foodbankicon;

    return (
      <Swipeable
        ref={ref => swipeableRefs.set(item._id, ref)}
        renderRightActions={() => renderRightActions(item)}
        renderLeftActions={() => renderLeftActions(item)}>
        <TouchableOpacity
          onPress={() => navToItemDetails(item)}
          style={styles.item}>
          <Image source={itemImage} style={styles.itemImage} />
          <View style={styles.itemTextContainer}>
            {deletingItemId === item._id || updatingItemId === item._id ? (
              <ActivityIndicator size="small" color="#495057" />
            ) : (
              <>
                <Text style={[styles.itemText, {color: backgroundColor}]}>
                  {capitalizeWords(item.name)}
                </Text>
                <Text
                  style={[styles.remainingDaysText, {color: backgroundColor}]}>
                  {daysRemaining} days remaining
                </Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  const navToMultiSelect = () => {
    navigation.navigate('MultiSelect', {items: items});
  };

  const navToOnboardingStack = module => {
    navigation.navigate('OnboardingStack', {
      screen: 'OnboardingStartScreen',
      params: {module: module[0]},
    });
  };

  return (
    <View style={styles.container}>
      {isItemsLoading && loading ? (
        <View style={styles.loadingContainer}>
          <Image source={foodbankicon} style={styles.loadingScreenIcon} />

          <ActivityIndicator
            style={styles.loadingScreenSpinner}
            size="large"
            color="#1b4965"
          />
          <Text style={styles.loadingText}>Taking Stock...</Text>
        </View>
      ) : (
        <>
          <UserHeader
            selectedIcon={selectedIcon}
            userData={userData}
            navigation={navigation}
          />
          {/* <UserProgressBar loading={loading} userData={userData} /> */}
          <View style={styles.selectedWrapper}>
            <TextInput
              style={styles.boxInput}
              placeholder="Enter FeedLink Code"
              placeholderTextColor={'black'}
              value={boxInput.toUpperCase()}
              onChangeText={setBoxInput}
              maxLength={5}
            />
            <Pressable
              disabled={boxInput.length < 5}
              onPress={() => addFoodBoxItems(boxInput)}
              style={({pressed}) => [
                styles.boxButton,
                {backgroundColor: pressed ? 'rgba(0, 0, 255, 0.5)' : '#228B22'},
                boxInput.length < 5 && styles.disabledButton,
              ]}>
              <Text
                style={[
                  styles.saveText,
                  boxInput.length === 5 && styles.whiteText,
                ]}>
                {isBoxItemsLoading ? (
                  <ActivityIndicator size="small" color="#495057" />
                ) : (
                  'Log FeedLink Items'
                )}
              </Text>
            </Pressable>
          </View>

          <View style={styles.headerText}>
            <Text style={styles.titleText}>Your Items ({items.length})</Text>
            {items.length > 0 ? (
              isDeletingAllItems ? (
                <ActivityIndicator size="small" color="#495057" />
              ) : (
                <TouchableOpacity
                  style={styles.headerIcon}
                  onPress={confirmDeleteAll}>
                  <AntDesignIcon name="delete" size={18} color="black" />
                </TouchableOpacity>
              )
            ) : null}
          </View>
          <View>
            {items.length > 0 ? (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
                style={styles.scrollViewStyle}>
                {availableCategories.map(category => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.tab,
                      currentCategory === category && styles.selectedTab,
                    ]}
                    onPress={() => setCurrentCategory(category)}>
                    <Text
                      style={[
                        styles.tabText,
                        currentCategory === category && styles.selectedTabText,
                      ]}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : null}
          </View>

          {items.length > 0 ? (
            <FlatList
              style={styles.itemsList}
              windowSize={10}
              data={filteredItems}
              keyExtractor={(item, index) =>
                item._id ? item._id : index.toString()
              }
              renderItem={swipeItem}
              // initialNumToRender={10}
              // windowSize={5}
              // maxToRenderPerBatch={10}
              // removeClippedSubviews={true}
            />
          ) : (
            <ScrollView
              style={styles.emptyStateContainer}
              contentContainerStyle={styles.emptyStateContentContainer}>
              <TouchableOpacity
                onPress={() => navToOnboardingStack(onboardingModule)}
                style={styles.actionItemContainer}>
                <View>
                  <Image
                    source={foodbankicon}
                    style={styles.emptyStateChefLogo}
                  />
                </View>
                <Text style={styles.actionItemText}>How to use FeedLink</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.actionItemContainer}
                onPress={() => setAddItemModalVisible(true)}>
                <View
                  style={styles.emptyFab}
                  onPress={() => setAddItemModalVisible(true)}>
                  <Text style={styles.plusOne}>+ 1</Text>
                </View>
                <Text style={styles.actionItemText}>Add Single Item</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => navToMultiSelect()}
                style={styles.actionItemContainer}>
                <View style={styles.emptyFab}>
                  <AntDesignIcon name="plus" size={20} color="white" />
                </View>
                <Text style={styles.actionItemText}>Add Grocery Items</Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          <DatePicker
            mode="date"
            modal
            open={open}
            date={selectedDate}
            minimumDate={new Date()}
            maximumDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}
            onConfirm={date => {
              setOpen(false);
              setSelectedDate(date);
              if (currentItem) {
                updateExpDate(currentItem, date);
              }
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />

          <View style={styles.fabContainer}>
            {/* <TouchableOpacity
              style={styles.fabButton}
              onPress={() => setAddItemModalVisible(true)}>
              <Text style={styles.fabButtonText}>Add Single Item</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.fabButton}
              onPress={() => navToMultiSelect()}>
              <Text style={styles.fabButtonText}>Add Grocery Items</Text>
            </TouchableOpacity>
          </View>

          <Modal
            isVisible={isBadReviewModalVisible}
            onBackdropPress={() => setBadReviewModalVisible(false)}
            style={styles.badReviewContainer}>
            <View style={styles.modalContent}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesignIcon name="dislike2" size={25} color="black" />

                <Text style={styles.modalHeader}>What Went Wrong?</Text>
              </View>
              <TouchableOpacity
                style={styles.reviewOptions}
                onPress={() =>
                  handleBadReviewOption('spoiled faster than expected')
                }>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconCalendarClock color={'black'} size={24} />
                  <Text style={styles.optionText}>
                    Spoiled Sooner Than Expected
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.reviewOptions}
                onPress={() => handleBadReviewOption('overpurchased item')}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconShoppingCart color={'black'} size={24} />
                  <Text style={styles.optionText}>Overpurchased Item</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.reviewOptions}
                onPress={() => handleBadReviewOption('poor quality or taste')}>
                <Text>Poor quality or taste</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.reviewOptions}
                onPress={() => handleBadReviewOption('not enough cooking')}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconChefHat color={'black'} size={24} />
                  <Text style={styles.optionText}>Not Enough Cooking</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.reviewOptions}
                onPress={() =>
                  handleBadReviewOption('lost/forgotten in fridge')
                }>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconFridge color={'black'} size={24} />
                  <Text style={styles.optionText}>
                    Lost/Forgotten in Fridge
                  </Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.reviewOptions}
                onPress={() => handleBadReviewOption('bad storage technique')}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconShoppingCart color={'black'} size={24} />
                  <Text style={styles.optionText}>Bad Storage Technique</Text>
                </View>
              </TouchableOpacity> */}
            </View>
          </Modal>

          {/* <Modal
            isVisible={isAddItemModalVisible}
            onBackdropPress={() => setAddItemModalVisible(false)}
            style={styles.singleAddItemContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setAddItemModalVisible(false)}>
                <AntDesignIcon name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalHeader}>Add Single Item</Text>
              <TextInput
                style={styles.input}
                placeholder="Search Item Name"
                placeholderTextColor={'black'}
                value={capitalizeWords(input)}
                onChangeText={setInput}
              />

              {filteredItemNames.length > 0 && (
                <FlatList
                  data={filteredItemNames}
                  keyExtractor={item => item._id}
                  renderItem={renderFoodItem}
                  style={styles.singleAddItemList}
                />
              )}

              {isLoading ? (
                <View style={styles.confirmButtonContainer}>
                  <ActivityIndicator size="large" color="#495057" />
                </View>
              ) : (
                <Pressable
                  disabled={!input}
                  onPress={() => addCustomItem(input)}
                  style={({pressed}) => [
                    styles.button,
                    {
                      backgroundColor: pressed
                        ? 'rgba(0, 0, 255, 0.5)'
                        : '#76c893',
                    },
                    !newItemName && styles.disabledButton,
                  ]}>
                  <Text style={styles.saveText}>Save</Text>
                </Pressable>
              )}
            </View>
          </Modal> */}
        </>
      )}
    </View>
  );
};

export default Kitchen;
