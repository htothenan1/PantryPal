/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
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
import ProgressBar from 'react-native-progress/Bar';
import {Swipeable} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';
import Modal from 'react-native-modal';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {auth} from '../firebase';
import {ingredients} from './data/ingredients';
import {icons} from './data/icons';
import {itemNames} from './data/itemNames';
import {lvlToXp, getBackgroundColor} from './helpers/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {onboardingModule} from './data/modules';
import styles from './styles/kitchen';
import DatePicker from 'react-native-date-picker';
import chefLogo from '../assets/chefs_hat.png';

const API_URL = 'https://flavr-413021.ue.r.appspot.com/';

const Kitchen = ({route}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const swipeableRefs = useRef(new Map()).current;
  const [isAddItemModalVisible, setAddItemModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [isItemsLoading, setIsItemsLoading] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customSelectedDate, setCustomSelectedDate] = useState(
    new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
  );
  const [currentCategory, setCurrentCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState(items);
  const [availableCategories, setAvailableCategories] = useState(['all']);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [input, setInput] = useState('');
  const [filteredItemNames, setFilteredItemNames] = useState([]);
  const [isDeletingAllItems, setIsDeletingAllItems] = useState(false);

  const navigation = useNavigation();
  const userEmail = auth.currentUser?.email;

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

  useEffect(() => {
    if (input.trim() === '') {
      setFilteredItemNames([]);
    } else {
      const filtered = itemNames.filter(item =>
        item.toLowerCase().startsWith(input.toLowerCase()),
      );
      setFilteredItemNames(filtered);
    }
  }, [input]);

  const renderFoodItem = ({item}) => {
    const ingredient = findIngredient(item);
    const itemImage = ingredient ? ingredient.img : chefLogo;

    return (
      <TouchableOpacity
        onPress={() => {
          setInput(item);
          setFilteredItemNames([]);
        }}
        style={styles.singleAddItem}>
        <Image source={itemImage} style={styles.singleAddItemIcon} />
        <Text>{capitalizeWords(item)}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const categories = calculateAvailableCategories();
    setAvailableCategories(categories);
  }, [items]);

  useEffect(() => {
    setIsItemsLoading(true);

    const fetchFirstItems = async () => {
      try {
        if (!userEmail) {
          console.error('User email is not available');
          setIsItemsLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}/items?email=${userEmail}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const sortedItems = data.sort((a, b) => {
          const dateA = new Date(a.exp_date);
          const dateB = new Date(b.exp_date);
          return dateA - dateB;
        });

        setItems(sortedItems);
      } catch (error) {
        console.error('Error fetching items in useEffect:', error.message);
      } finally {
        setIsItemsLoading(false);
      }
    };

    fetchFirstItems();
  }, []);

  useEffect(() => {
    const checkOnboarding = async () => {
      const hasCompletedOnboarding = await AsyncStorage.getItem(
        `hasCompletedOnboarding-${userEmail}`,
      );

      if (!hasCompletedOnboarding) {
        navigation.navigate('OnboardingStack', {
          screen: 'OnboardingStartScreen',
          params: {module: onboardingModule[0]},
        });
      }
    };

    checkOnboarding();
  }, []);

  useEffect(() => {
    filterItemsByCategory();
  }, [items, currentCategory]);

  const findIngredient = itemName => {
    if (typeof itemName !== 'string') {
      return null;
    }

    let ingredient = ingredients.find(
      ing => ing.name && ing.name.toLowerCase() === itemName.toLowerCase(),
    );

    return ingredient;
  };

  const deleteItem = async (itemId, method) => {
    setDeletingItemId(itemId);
    try {
      const response = await fetch(
        `${API_URL}/items/${itemId}?method=${method}`,
        {
          method: 'DELETE',
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

      setItems(currentItems =>
        currentItems.filter(item => item._id !== itemId),
      );
      fetchUserData();
    } catch (error) {
      console.error('Error deleting item:', error.message);
    } finally {
      setDeletingItemId(null);
    }
  };

  const confirmDeleteAll = () => {
    Alert.alert(
      'Delete All Items',
      'Are you sure you want to delete all items? This will not count against your statistics.',
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

  const fetchItems = async () => {
    try {
      if (!userEmail) {
        console.error('User email is not available');
        setIsItemsLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/items?email=${userEmail}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const sortedItems = data.sort((a, b) => {
        const dateA = new Date(a.exp_date);
        const dateB = new Date(b.exp_date);
        return dateA - dateB;
      });

      setItems(sortedItems);
    } catch (error) {
      console.error('Error fetching items:', error.message);
    } finally {
      setIsItemsLoading(false);
    }
  };

  async function addCustomItem(itemName) {
    setIsLoading(true);
    try {
      if (!itemName) {
        throw new Error('Item name is required');
      }

      const existingIngredient = ingredients.find(
        ingredient => ingredient.name.toLowerCase() === itemName.toLowerCase(),
      );

      let storageTip = 'Not available';
      let expInt = calculateDaysUntilExpiration(customSelectedDate);

      if (existingIngredient) {
        storageTip = existingIngredient.storage_tip;
        expInt = existingIngredient.exp_int;
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
      }

      const newItem = {
        name: itemName,
        exp_int: expInt,
        storage_tip: storageTip,
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
      setCustomSelectedDate(new Date(Date.now() + 6 * 24 * 60 * 60 * 1000));
      fetchUserData();
      fetchItems();
    } catch (error) {
      console.error('Error adding custom item:', error);
    } finally {
      setIsLoading(false);
    }
  }

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
      fetchItems();
      fetchUserData();
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
    deleteItem(data._id, 'undo');
    const swipeable = swipeableRefs.get(data._id);
    if (swipeable) {
      swipeable.close();
    }
  };
  const handleWaste = data => {
    deleteItem(data._id, 'waste');
    const swipeable = swipeableRefs.get(data._id);
    if (swipeable) {
      swipeable.close();
    }
  };
  const handleConsume = data => {
    deleteItem(data._id, 'consume');
    const swipeable = swipeableRefs.get(data._id);
    if (swipeable) {
      swipeable.close();
    }
  };

  const calculateAvailableCategories = () => {
    let allCategories = [];
    if (items.length > 0) {
      allCategories.push('all');
    }

    items.forEach(item => {
      const ingredient = findIngredient(item.name);
      if (ingredient && !allCategories.includes(ingredient.category)) {
        allCategories.push(ingredient.category);
      }
    });

    return allCategories;
  };

  const renderRightActions = item => {
    return (
      <View style={styles.rightSwipeContainer}>
        <TouchableOpacity
          onPress={() => handleUndo(item)}
          style={styles.swipeButton}>
          <AntDesignIcon name="delete" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleWaste(item)}
          style={styles.swipeButton}>
          <AntDesignIcon name="dislike2" size={25} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleConsume(item)}
          style={styles.swipeButton}>
          <AntDesignIcon name="like2" size={25} color="green" />
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
    navigation.navigate('ItemDetails', {
      item: itemObject,
      userItems: items,
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/users/data?email=${userEmail}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/data?email=${userEmail}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        if (route.params?.itemsAdded) {
          fetchItems();

          if (userEmail) {
            fetchUserData();
          }

          navigation.setParams({itemsAdded: false});
        }
      });

      return unsubscribe;
    }, [navigation, route.params?.itemsAdded]),
  );

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

  const calculateDaysUntilExpiration = expDate => {
    const currentDate = new Date();
    const expirationDate = new Date(expDate);
    const timeDiff = expirationDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const capitalizeWords = str => {
    if (!str) {
      return '';
    }
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  const renderItem = ({item}) => {
    const daysRemaining = calculateDaysUntilExpiration(item.exp_date);
    const backgroundColor = getBackgroundColor(daysRemaining);

    const ingredient = findIngredient(item.name);
    const itemImage = ingredient ? ingredient.img : chefLogo;

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
      {isItemsLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={chefLogo}
            style={{
              height: 100,
              width: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />

          <ActivityIndicator
            style={{marginVertical: 10}}
            size="large"
            color="#1b4965"
          />
          <Text style={styles.loadingText}>Loading Your Items...</Text>
        </View>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate('Account')}
            style={styles.headerContainer}>
            {selectedIcon ? (
              <Image source={selectedIcon} style={styles.userIcon} />
            ) : (
              <View style={{marginTop: 10}}>
                <AntDesignIcon
                  style={styles.userIcon}
                  name="user"
                  size={53}
                  color="black"
                />
              </View>
            )}
            <View>
              <Text style={styles.userName}>{userData?.firstName}</Text>
              <Text style={styles.levelText}>Level {userData?.level}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <Text style={styles.progressTitle}>Your Progress</Text>
            {loading ? (
              <View style={{height: 42}}>
                <ActivityIndicator size="small" color="#495057" />
              </View>
            ) : (
              <>
                <ProgressBar
                  progress={
                    (userData?.xp % 1000) /
                    (lvlToXp(userData?.level) / userData?.level)
                  }
                  width={null}
                  height={10}
                  borderRadius={5}
                  color="#1b4965"
                  unfilledColor="#E0E0E0"
                  borderWidth={0}
                  style={styles.progressBar}
                />
                <Text style={styles.progressText}>
                  {userData?.xp}/{lvlToXp(userData?.level)} XP
                </Text>
              </>
            )}
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
                  <AntDesignIcon name="delete" size={20} color="black" />
                </TouchableOpacity>
              )
            ) : null}
          </View>
          <View>
            {items.length > 0 ? (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  margin: 0,
                  padding: 0,
                  height: 50,
                  paddingBottom: 0,
                }}
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

          {isItemsLoading ? (
            <View style={styles.itemsLoadingContainer}>
              <ActivityIndicator size="large" color="#495057" />
            </View>
          ) : items.length > 0 ? (
            <FlatList
              windowSize={10}
              style={styles.itemsList}
              data={filteredItems}
              keyExtractor={item => item._id}
              renderItem={renderItem}
            />
          ) : (
            <ScrollView
              style={{marginTop: 20, marginBottom: 80}}
              contentContainerStyle={styles.emptyStateContainer}>
              <TouchableOpacity
                onPress={() => navToOnboardingStack(onboardingModule)}
                style={styles.actionItemContainer}>
                <View>
                  <Image
                    source={chefLogo}
                    style={{
                      height: 56,
                      width: 56,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>
                <Text style={styles.actionItemText}>How to use FlavrAi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionItemContainer}
                onPress={() => setAddItemModalVisible(true)}>
                <View
                  style={styles.emptyFab}
                  onPress={() => setAddItemModalVisible(true)}>
                  <Text style={{fontSize: 16, color: 'white'}}>+ 1</Text>
                </View>
                <Text style={styles.actionItemText}>Add Single Item</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navToMultiSelect()}
                style={styles.actionItemContainer}>
                <View style={styles.emptyFab}>
                  <AntDesignIcon name="bars" size={20} color="white" />
                </View>
                <Text style={styles.actionItemText}>MultiSelect from List</Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          <DatePicker
            mode="date"
            modal
            open={open}
            date={selectedDate}
            minimumDate={new Date()}
            maximumDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
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

          <DatePicker
            mode="date"
            modal
            open={customOpen}
            date={customSelectedDate}
            minimumDate={new Date()}
            maximumDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
            onConfirm={date => {
              setCustomOpen(false);
              setCustomSelectedDate(date);
            }}
            onCancel={() => {
              setCustomOpen(false);
            }}
          />

          <View style={styles.fabContainer}>
            <TouchableOpacity
              style={styles.fabButton}
              onPress={() => setAddItemModalVisible(true)}>
              <Text style={styles.fabButtonText}>Add Single Item</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.fabButton}
              onPress={() => navToMultiSelect()}>
              <Text style={styles.fabButtonText}>MultiSelect From List</Text>
            </TouchableOpacity>
          </View>

          <Modal
            isVisible={isAddItemModalVisible}
            onBackdropPress={() => setAddItemModalVisible(false)}
            style={{alignItems: 'left', padding: 100}}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={{position: 'absolute', top: 10, right: 10}}
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
                  keyExtractor={item => item}
                  renderItem={renderFoodItem}
                  style={{
                    maxHeight: 250,
                    borderColor: '#ccc',
                    borderWidth: 1,
                    marginBottom: 10,
                  }}
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
          </Modal>
        </>
      )}
    </View>
  );
};

export default Kitchen;
