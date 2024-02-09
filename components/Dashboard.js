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
import Modal from 'react-native-modal';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {auth} from '../firebase';
import {ingredients} from './data/ingredients';
import styles from './styles/dashboard';
import DatePicker from 'react-native-date-picker';
import firstStep from '../assets/first_step.png';
import foodRespect from '../assets/food_respect.png';
// import savingMoney from '../assets/saving_money.png';
import kitchenPrep from '../assets/kitchen_prep.png';
import homeCooking from '../assets/home_cooking.png';

const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};
const carouselObjects = [
  {
    image: firstStep,
    title: 'The First Step',
  },
  {
    image: homeCooking,
    title: "Mastering the 5 S's of Cooking",
  },
  {
    image: foodRespect,
    title: 'Respecting The Food You Purchase',
  },
  // {
  //   image: savingMoney,
  //   title: 'The Best Way to Save Money',
  // },
  {
    image: kitchenPrep,
    title: 'The Many Perks of a Tidy Kitchen',
  },
];
const API_URL = 'https://flavr-413021.ue.r.appspot.com/';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const swipeableRefs = useRef(new Map()).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAddItemModalVisible, setAddItemModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [isDashVisible, setIsDashVisible] = useState(true);
  const [isItemsLoading, setIsItemsLoading] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customSelectedDate, setCustomSelectedDate] = useState(
    new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
  );

  const navigation = useNavigation();
  const userEmail = auth.currentUser?.email;

  const toggleDashVisibility = () => {
    setIsDashVisible(!isDashVisible);
  };

  const deleteItem = async (itemId, method) => {
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

      setItems(currentItems =>
        currentItems.filter(item => item._id !== itemId),
      );
    } catch (error) {
      console.error('Error deleting item:', error.message);
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
    setIsItemsLoading(true);

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
      setIsItemsLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error.message);
      setIsItemsLoading(false);
    }
  };

  async function addCustomItem(itemName) {
    try {
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
      setItems(currentItems => [...currentItems, ...savedItems]);
      setAddItemModalVisible(false);
      setNewItemName('');
      setCustomSelectedDate(new Date(Date.now() + 6 * 24 * 60 * 60 * 1000));
    } catch (error) {
      console.error('Error adding custom item:', error);
    }
  }
  async function addCustomItem(itemName) {
    setIsLoading(true);
    try {
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
      setItems(currentItems => [...currentItems, ...savedItems]);
      setAddItemModalVisible(false);
      setNewItemName('');
      setCustomSelectedDate(new Date(Date.now() + 6 * 24 * 60 * 60 * 1000));
    } catch (error) {
      console.error('Error adding custom item:', error);
    } finally {
      setIsLoading(false);
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

  const navToArticleDetails = articleObject => {
    navigation.navigate('ArticleDetails', {
      article: articleObject,
    });
  };

  // const navToCamera = () => {
  //   navigation.navigate('CameraPage');
  // };
  const getBackgroundColor = daysRemaining => {
    if (daysRemaining >= 5) {
      return '#2c6e49'; // Green background for 5 or more days remaining
    } else if (daysRemaining >= 2 && daysRemaining <= 4) {
      return '#2c6e49'; // Yellow background for 2, 3, or 4 days remaining
    } else {
      return '#d90429'; // Red background for 1 day or less
    }
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

  // useEffect(() => {
  //   async function getPermission() {
  //     const permission = await Camera.requestCameraPermission();
  //     if (permission === 'denied') {
  //       await Linking.openSettings();
  //     }
  //   }
  //   getPermission();
  // }, []);

  const calculateDaysUntilExpiration = expDate => {
    const currentDate = new Date();
    const expirationDate = new Date(expDate);
    const timeDiff = expirationDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const renderItem = ({item}) => {
    const daysRemaining = calculateDaysUntilExpiration(item.exp_date);
    const backgroundColor = getBackgroundColor(daysRemaining);
    return (
      <Swipeable
        ref={ref => swipeableRefs.set(item._id, ref)}
        renderRightActions={() => renderRightActions(item)}
        renderLeftActions={() => renderLeftActions(item)}>
        <TouchableOpacity
          onPress={() => navToItemDetails(item)}
          style={styles.item}>
          <View style={styles.itemTextContainer}>
            <Text style={[styles.itemText, {color: backgroundColor}]}>
              {item.name}
            </Text>
            <Text style={[styles.itemText, {color: backgroundColor}]}>
              {daysRemaining} days remaining
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

  const renderItems = ({item}) => {
    const title =
      item.title.length > 15 ? `${item.title.slice(0, 30)}...` : item.title;

    return (
      <TouchableOpacity
        onPress={() => navToArticleDetails(item)}
        activeOpacity={1}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.footerText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerText}>
        <Text style={styles.titleText}>Your Items ({items.length})</Text>
        {items.length > 0 ? (
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={confirmDeleteAll}>
            <AntDesignIcon name="delete" size={20} color="black" />
          </TouchableOpacity>
        ) : null}
      </View>

      {items.length > 0 ? (
        isItemsLoading ? (
          <View style={styles.itemsLoadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            windowSize={10}
            style={styles.itemsList}
            data={items}
            keyExtractor={item => item._id}
            renderItem={renderItem}
          />
        )
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            No items yet. Tap{' '}
            <TouchableOpacity
              style={styles.emptyFab}
              onPress={() => navToMultiSelect()}>
              <AntDesignIcon name="plus" size={20} color="white" />
            </TouchableOpacity>{' '}
            to choose from our common ingredients, or{' '}
            <TouchableOpacity
              style={styles.emptyFab}
              onPress={() => setAddItemModalVisible(true)}>
              <AntDesignIcon name="edit" size={20} color="white" />
            </TouchableOpacity>{' '}
            to add a custom item
          </Text>
        </View>
      )}

      {/* <View style={styles.headerText}>
        <Text style={styles.titleText}>Dashboard</Text>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={toggleDashVisibility}>
          <AntDesignIcon
            name={isDashVisible ? 'up' : 'down'}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {isDashVisible && (
        <View style={styles.dashContainer}>
          <FlatList
            data={carouselObjects}
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
        </View>
      )} */}

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

      <View>
        <TouchableOpacity
          style={styles.leftFab}
          onPress={() => setAddItemModalVisible(true)}>
          <AntDesignIcon name="edit" size={20} color="white" />
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.centerFab}
          onPress={() => navToCamera()}>
          <AntDesignIcon name="camerao" size={20} color="white" />
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.fab} onPress={() => navToMultiSelect()}>
          <AntDesignIcon name="plus" size={20} color="white" />
        </TouchableOpacity>

        <Modal
          isVisible={isAddItemModalVisible}
          onBackdropPress={() => setAddItemModalVisible(false)}>
          <View style={styles.modalContent}>
            <AntDesignIcon name="edit" size={30} color="black" />
            <Text style={styles.modalHeader}>Add Custom Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              placeholderTextColor={'black'}
              value={newItemName}
              onChangeText={setNewItemName}
            />
            <Button
              title={`Use In The Next: ${calculateDaysUntilExpiration(
                customSelectedDate,
              )} days`}
              onPress={() => setCustomOpen(true)}
            />
            {isLoading ? (
              <View style={styles.confirmButtonContainer}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            ) : (
              <Button
                title="Confirm"
                onPress={() => addCustomItem(newItemName)}
              />
            )}
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Dashboard;
