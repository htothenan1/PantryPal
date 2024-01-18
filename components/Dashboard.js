import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  Linking,
  Button,
  Alert,
} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {Swipeable} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';
import {SPOON_KEY} from '@env';
import Modal from 'react-native-modal';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {auth} from '../firebase';
import {ingredients} from './data/ingredients';
import styles from './styles/dashboard';
import DatePicker from 'react-native-date-picker';

const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};
const API_URL =
  'https://616d-2600-4041-54c4-7200-b8e2-be63-2ed3-884b.ngrok-free.app';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [fetchedRecipes, setFetchedRecipes] = useState(null);
  const swipeableRefs = useRef(new Map()).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecipesLoading, setIsRecipesLoading] = useState(false);
  const [isAddItemModalVisible, setAddItemModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [isRecipesVisible, setIsRecipesVisible] = useState(true); // By default, the section is visible

  const navigation = useNavigation();

  const userEmail = auth.currentUser?.email;

  const toggleRecipesVisibility = () => {
    setIsRecipesVisible(!isRecipesVisible);
  };

  const deleteItem = async (itemId, method) => {
    try {
      const response = await fetch(
        `https://616d-2600-4041-54c4-7200-b8e2-be63-2ed3-884b.ngrok-free.app/items/${itemId}?method=${method}`,
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

      setItems(currentItems =>
        currentItems.filter(item => item._id !== itemId),
      );
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  const handleRefreshRecipes = () => {
    fetchRecipes(items);
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
    try {
      const response = await fetch(`${API_URL}/items/deleteAll`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchItems();
    } catch (error) {
      console.error('Error deleting items:', error.message);
    }
  };

  const fetchItems = async () => {
    try {
      if (!userEmail) {
        console.error('User email is not available');
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
    }
  };

  async function addCustomItem(itemName) {
    try {
      const existingIngredient = ingredients.find(
        ingredient => ingredient.name.toLowerCase() === itemName.toLowerCase(),
      );

      let storageTip = 'Not available';
      let expInt = 6;

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
      setItems(currentItems => [...currentItems, ...savedItems]);

      setAddItemModalVisible(false);
      setNewItemName('');
    } catch (error) {
      console.error('Error adding custom item:', error);
    }
  }

  const updateExpDate = async (item, newDate) => {
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

      await response.json();
      fetchItems();
      setSelectedDate(new Date());
      const swipeable = swipeableRefs.get(item._id);
      if (swipeable) {
        swipeable.close();
      }
    } catch (error) {
      console.error('Error updating expiration date:', error.message);
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

  const navToCamera = () => {
    navigation.navigate('CameraPage');
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        await fetchItems();
      };

      if (isActive) {
        fetchData().catch(console.error);
      }

      return () => {
        isActive = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffect(() => {
    async function getPermission() {
      const permission = await Camera.requestCameraPermission();
      console.log(`Camera permission status: ${permission}`);
      if (permission === 'denied') {
        await Linking.openSettings();
      }
    }
    getPermission();
  }, []);

  const calculateDaysUntilExpiration = expDate => {
    const currentDate = new Date();
    const expirationDate = new Date(expDate);
    const timeDiff = expirationDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const renderItem = ({item}) => {
    return (
      <Swipeable
        ref={ref => {
          swipeableRefs.set(item._id, ref);
        }}
        renderRightActions={() => renderRightActions(item)}
        renderLeftActions={() => renderLeftActions(item)}>
        <TouchableOpacity
          onPress={() => navToItemDetails(item)}
          style={styles.item}>
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>
              {calculateDaysUntilExpiration(item.exp_date)}d
            </Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  const navToMultiSelect = () => {
    navigation.navigate('MultiSelect', {items: items});
  };

  const onViewRef = useRef(({changed}) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const fetchRecipes = async currentItems => {
    setIsRecipesLoading(true);

    if (currentItems && currentItems.length > 0) {
      const queryString = currentItems.map(item => item.name).join(',+');
      const randomInt = Math.floor(Math.random() * 10) + 1;
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${SPOON_KEY}&ingredients=${queryString}&offset=${randomInt}&number=25`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const resItems = await response.json();
        setFetchedRecipes(resItems);
        setIsRecipesLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error.message);
      }
    } else {
      setIsRecipesLoading(false);
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

  const renderItems = ({item}) => {
    const title =
      item.title.length > 15 ? `${item.title.slice(0, 30)}...` : item.title;

    return (
      <TouchableOpacity
        onPress={() => handleSelectRecipe(item.id)}
        activeOpacity={1}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text style={styles.footerText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerText}>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={toggleRecipesVisibility}>
          <AntDesignIcon
            name={isRecipesVisible ? 'up' : 'down'}
            size={20}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>Your Recipes</Text>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={handleRefreshRecipes}>
          <AntDesignIcon
            name={isRecipesVisible ? 'reload1' : null}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {isRecipesVisible && (
        <View style={styles.recipesContainer}>
          {!fetchedRecipes && !isRecipesLoading && (
            <View style={styles.fetchRecipesContainer}>
              <TouchableOpacity onPress={handleRefreshRecipes}>
                <AntDesignIcon name="reload1" size={30} color="black" />
              </TouchableOpacity>
              <Text style={styles.fetchRecipesText}>
                Get Recipes Based On Your Items!
              </Text>
              <Text style={styles.fetchRecipesSubText}>
                Tap the refresh icon to start!
              </Text>
            </View>
          )}

          {isRecipesLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            fetchedRecipes &&
            fetchedRecipes.length > 0 && (
              <FlatList
                data={fetchedRecipes}
                renderItem={renderItems}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                ref={ref => {
                  flatListRef.current = ref;
                }}
                viewabilityConfig={viewConfigRef}
                onViewableItemsChanged={onViewRef.current}
              />
            )
          )}
        </View>
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

      <View style={styles.headerText}>
        <Text style={styles.titleText}>Your Items ({items.length})</Text>
        <TouchableOpacity style={styles.headerIcon} onPress={confirmDeleteAll}>
          <AntDesignIcon name="delete" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        windowSize={10}
        style={styles.itemsList}
        data={items}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />

      <View>
        <TouchableOpacity
          style={styles.leftFab}
          onPress={() => setAddItemModalVisible(true)}>
          <AntDesignIcon name="edit" size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.centerFab}
          onPress={() => navToCamera()}>
          <AntDesignIcon name="camerao" size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.fab} onPress={() => navToMultiSelect()}>
          <AntDesignIcon name="menuunfold" size={20} color="white" />
        </TouchableOpacity>

        <Modal
          isVisible={isAddItemModalVisible}
          onBackdropPress={() => setAddItemModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add Custom Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={newItemName}
              onChangeText={setNewItemName}
            />
            <Button
              title="Confirm"
              onPress={() => addCustomItem(newItemName)}
            />
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Dashboard;
