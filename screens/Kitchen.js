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
import {UserContext} from '../contexts/UserContext';
import {Swipeable} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';
import Modal from 'react-native-modal';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {auth} from '../firebase';
import {ingredients} from './data/ingredients';
import {
  IconFridge,
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
import {onboardingModule} from './data/modules';
import styles from './styles/kitchen';
import DatePicker from 'react-native-date-picker';
import foodbankicon from '../assets/foodbankicon.png';

const Kitchen = ({route}) => {
  const {userData, items, setItems, fetchItems, fetchUserData, loading} =
    useContext(UserContext);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isBadReviewModalVisible, setBadReviewModalVisible] = useState(false);
  const [isItemsLoading, setIsItemsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState(items);
  const [availableCategories, setAvailableCategories] = useState(['all']);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [boxInput, setBoxInput] = useState('');
  const [isDeletingAllItems, setIsDeletingAllItems] = useState(false);
  const [isBoxItemsLoading, setIsBoxItemsLoading] = useState(false);
  const [currentItemToDelete, setCurrentItemToDelete] = useState(null);

  const swipeableRefs = useRef(new Map()).current;
  const userEmail = auth.currentUser?.email;
  const navigation = useNavigation();

  useEffect(() => {
    if (userEmail) {
      const fetchData = async () => {
        try {
          setIsItemsLoading(true);
          await fetchUserData(userEmail);
          await fetchItems(userEmail);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsItemsLoading(false);
        }
      };

      fetchData();
    }
  }, [userEmail]);

  useEffect(() => {
    const categories = calculateAvailableCategories(items);
    setAvailableCategories(categories);
    filterItemsByCategory();
  }, [items, currentCategory]);

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

  const deleteItem = async (itemId, method, reason) => {
    setDeletingItemId(itemId);

    try {
      const itemResponse = await fetch(`${API_URL}/items/${itemId}`);
      if (!itemResponse.ok) {
        throw new Error('Item not found');
      }

      const itemData = await itemResponse.json();
      const isFoodBoxItem = itemData.isFoodBoxItem;

      const deletePayload = {
        method,
        isFoodBoxItem,
        foodBoxId: isFoodBoxItem ? itemData.foodBoxId : null,
        reason,
      };

      const response = await fetch(
        `${API_URL}/items/${itemId}?method=${method}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(deletePayload),
        },
      );

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Problem deleting item: Status ${response.status}, Body: ${errorBody}`,
        );
      }

      setItems(currentItems =>
        currentItems.filter(item => item._id !== itemId),
      );

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

  const addFoodBoxItems = async boxItems => {
    setIsBoxItemsLoading(true);
    const foodBox = await fetchFoodBoxByCode(boxItems);

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
          isFoodBoxItem: true,
          foodBoxId: foodBox.code,
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
      } catch (error) {
        console.error('Error adding items:', error.message);
      } finally {
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

  const handleWaste = item => {
    setCurrentItemToDelete(item);
    setBadReviewModalVisible(true);
  };

  const handleBadReviewOption = reason => {
    if (currentItemToDelete) {
      deleteItem(currentItemToDelete._id, 'waste', reason);
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
          <UserHeader userData={userData} navigation={navigation} />
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
            <Text style={styles.titleText}>Your Food ({items.length})</Text>
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
              <TouchableOpacity
                onPress={() => navToMultiSelect()}
                style={styles.actionItemContainer}>
                <View style={styles.emptyFab}>
                  <AntDesignIcon name="plus" size={20} color="white" />
                </View>
                <Text style={styles.actionItemText}>Add Food Items</Text>
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
            <TouchableOpacity
              style={styles.fabButton}
              onPress={() => navToMultiSelect()}>
              <Text style={styles.fabButtonText}>Add Food Items</Text>
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
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

export default Kitchen;
