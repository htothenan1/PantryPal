import React, {useRef, useState} from 'react';
import {FlatList, Text, View, TouchableOpacity, Image} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';
import Modal from 'react-native-modal';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
// import {auth} from '../firebase';
// import {signOut} from 'firebase/auth';
import styles from './styles/dashboard';
import DatePicker from 'react-native-date-picker';

const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};

const Dashboard = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [fetchedRecipes, setFetchedRecipes] = useState(null);
  const swipeableRefs = useRef(new Map()).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const apiUrl =
    'https://37bf-2600-4041-54c4-7200-2420-7c9f-7c08-ed78.ngrok-free.app';

  const deleteItem = async itemId => {
    try {
      const response = await fetch(`${apiUrl}/items/${itemId}`, {
        method: 'DELETE',
      });

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

  const fetchItems = async () => {
    try {
      const response = await fetch(`${apiUrl}/items/`);
      const data = await response.json();

      const sortedItems = data.sort((a, b) => {
        const dateA = new Date(a.exp_date);
        const dateB = new Date(b.exp_date);
        return dateA - dateB;
      });

      setItems(sortedItems);
      await fetchRecipes(sortedItems);
    } catch (error) {
      console.error(error);
    }
  };

  const updateExpDate = async (item, newDate) => {
    const formattedDate = newDate.toISOString().split('T')[0];

    try {
      const url = `${apiUrl}/items/${item._id}`;

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
    deleteItem(data._id);
    const swipeable = swipeableRefs.get(data._id);
    if (swipeable) {
      swipeable.close();
    }
  };
  const handleWaste = data => {
    deleteItem(data._id);
    const swipeable = swipeableRefs.get(data._id);
    if (swipeable) {
      swipeable.close();
    }
  };
  const handleConsume = data => {
    deleteItem(data._id);
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
          <AntDesignIcon name="delete" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleWaste(item)}
          style={styles.swipeButton}>
          <AntDesignIcon name="frowno" size={25} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleConsume(item)}
          style={styles.swipeButton}>
          <AntDesignIcon name="smileo" size={25} color="green" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderLeftActions = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCurrentItem(item);
          setOpen(true);
        }}
        style={styles.swipeButton}>
        <AntDesignIcon name="calendar" size={25} color="white" />
      </TouchableOpacity>
    );
  };

  const navToItemDetails = itemObject => {
    navigation.navigate('ItemDetails', {item: itemObject});
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        await fetchItems();
      };

      if (isActive) fetchData().catch(console.error);

      return () => {
        isActive = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

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
    toggleModal();
  };

  const onViewRef = useRef(({changed}) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // const handleLogout = () => {
  //   signOut(auth)
  //     .then(() => {
  //       navigation.replace('Login');
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  const fetchRecipes = async items => {
    if (items && items.length > 0) {
      const queryString = items.map(item => item.name).join(',+');
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?apiKey=757d368ebb304fb3bf99a64e38c11942&ingredients=${queryString}&number=3`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const resItems = await response.json();
        setFetchedRecipes(resItems);
      } catch (error) {
        console.error('Error fetching recipes:', error.message);
      }
    } else {
      console.log('recipes error');
    }
  };

  const handleSelectRecipe = async data => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${data}/information?apiKey=757d368ebb304fb3bf99a64e38c11942&includeNutrition=false`,
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
      <Text style={styles.titleText}>Your Featured Recipes</Text>

      {fetchedRecipes && fetchedRecipes.length > 0 && (
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
          style={styles.carousel}
          viewabilityConfig={viewConfigRef}
          onViewableItemsChanged={onViewRef.current}
        />
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

      <Text style={styles.titleText}>Your Items ({items.length})</Text>

      <FlatList
        windowSize={10}
        style={styles.itemsList}
        data={items}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />

      <View>
        <TouchableOpacity style={styles.fab} onPress={toggleModal}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>

        <Modal
          onBackdropPress={toggleModal}
          isVisible={isModalVisible}
          style={styles.bottomModal}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.bottomModalRows}
              onPress={navToMultiSelect}>
              <AntDesignIcon name="menuunfold" size={20} color="black" />
              <Text style={styles.modalText}>Choose from List</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomModalRows}>
              <AntDesignIcon name="profile" size={20} color="black" />
              <Text style={styles.modalText}>Pic of Receipt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomModalRows}>
              <AntDesignIcon name="camerao" size={20} color="black" />
              <Text style={styles.modalText}>Pic of Groceries</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Dashboard;
