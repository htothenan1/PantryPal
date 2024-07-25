import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {API_URL} from '@env';
import {auth} from '../firebase';
import {ingredients} from './data/ingredients';
import chefLogo from '../assets/chefs_hat.png';
import styles from './styles/multiSelect';

const MultiSelectScreen = ({route}) => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('fruits');
  const [consumedItems, setConsumedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [omitMeats, setOmitMeats] = useState(false);
  const [omitSeafoods, setOmitSeafoods] = useState(false);
  const [omitDairy, setOmitDairy] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]);

  const userEmail = auth.currentUser?.email;
  const navigation = useNavigation();

  const capitalizeWords = str => {
    if (!str) {
      return '';
    }
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  const toggleSelection = item => {
    let newSelectedItems = [...selectedItems];
    let newExpandedItems = [...expandedItems];

    const parentItem = ingredients.find(ingredient =>
      ingredient.subItems?.includes(item),
    );

    if (parentItem) {
      newSelectedItems = newSelectedItems.filter(i => i !== parentItem);
      if (!newSelectedItems.includes(item)) {
        newSelectedItems.push(item);
        if (!newExpandedItems.includes(parentItem)) {
          newExpandedItems.push(parentItem);
        }
      } else {
        newSelectedItems = newSelectedItems.filter(i => i !== item);
      }
    } else {
      const anySubItemSelected = item.subItems?.some(subItem =>
        newSelectedItems.includes(subItem),
      );

      if (!newSelectedItems.includes(item) && !anySubItemSelected) {
        const matchedItem = ingredients.find(
          ingredient =>
            ingredient.name.toLowerCase() === item.name.toLowerCase(),
        );

        if (matchedItem) {
          item.storage_tip = matchedItem.storage_tip;
          item.whyEat = matchedItem.whyEat;
          item.exp_int = matchedItem.exp_int;
          item.compatibles = matchedItem.compatibles;
          item.img = matchedItem.img;
          item.category = matchedItem.category;
          item.goodSourceOf = matchedItem.goodsourceof;
        }

        newSelectedItems.push(item);
        newExpandedItems = newExpandedItems.filter(
          expandedItem => expandedItem !== item,
        );
      } else {
        newSelectedItems = newSelectedItems.filter(
          i => i !== item && !item.subItems?.includes(i),
        );
        newExpandedItems = newExpandedItems.filter(
          expandedItem => expandedItem !== item,
        );
      }
    }

    setSelectedItems(newSelectedItems);
    setExpandedItems(newExpandedItems);
  };

  useEffect(() => {
    const fetchUserData = async email => {
      try {
        const response = await fetch(`${API_URL}/users/data?email=${email}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setOmitMeats(data.omitMeats);
        setOmitSeafoods(data.omitSeafoods);
        setOmitDairy(data.omitDairy);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData(userEmail);
  }, [userEmail]);

  useEffect(() => {
    const fetchItemsData = async emailString => {
      try {
        const response = await fetch(
          `${API_URL}/items/useremail/${emailString}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const res = await response.json();
        const itemsMap = res.consumedItems
          .filter(item =>
            ingredients.some(
              ingredient =>
                ingredient.name.toLowerCase() === item.name.toLowerCase(),
            ),
          )
          .map(item => {
            const matchedItem = ingredients.find(
              ingredient =>
                ingredient.name.toLowerCase() === item.name.toLowerCase(),
            );
            return {
              ...item,
              category: 'consumed',
              item_id: item._id,
              name: item.name.toLowerCase(),
              exp_int: matchedItem?.exp_int || item.exp_int,
              storage_tip: matchedItem?.storage_tip || item.storage_tip,
              whyEat: matchedItem?.whyEat || item.whyEat,
              img: matchedItem?.img || item.img,
              compatibles: matchedItem?.compatibles || item.compatibles,
              goodSourceOf: matchedItem?.goodSourceOf || item.goodSourceOf,
            };
          });
        setConsumedItems(itemsMap);
      } catch (error) {
        console.error('Error fetching items data:', error.message);
      }
    };

    fetchItemsData(userEmail);
  }, [userEmail]);

  useEffect(() => {
    const itemsFromKitchen =
      route.params?.items.map(item => item.name.toLowerCase()) || [];

    const filteredItems = ingredients.filter(ingredient => {
      if (itemsFromKitchen.includes(ingredient.name.toLowerCase())) {
        return false;
      }

      if (ingredient.subItems) {
        const filteredSubItems = ingredient.subItems.filter(
          subItem => !itemsFromKitchen.includes(subItem.name.toLowerCase()),
        );
        if (filteredSubItems.length === 0) {
          return false;
        } else {
          ingredient.subItems = filteredSubItems;
        }
      }

      return true;
    });

    let itemsByCategory = filteredItems.filter(ingredient => {
      if (omitMeats && ingredient.category === 'meats') {
        return false;
      }
      if (omitSeafoods && ingredient.category === 'seafoods') {
        return false;
      }
      if (omitDairy && ingredient.category === 'dairy') {
        return false;
      }
      return true;
    });

    let availableCategories = [
      'fruits',
      'vegetables',
      'meats',
      'dairy',
      'grains',
      'seafoods',
      'consumed',
    ].filter(
      category =>
        itemsByCategory.some(item => item.category === category) ||
        (category === 'consumed' && consumedItems.length > 0),
    );

    setAvailableCategories(availableCategories);

    itemsByCategory = itemsByCategory.filter(
      ingredient => ingredient.category === currentCategory,
    );

    if (currentCategory === 'consumed') {
      itemsByCategory = consumedItems.filter(
        item => !itemsFromKitchen.includes(item.name.toLowerCase()),
      );
    }

    setItems(itemsByCategory);
  }, [
    route,
    currentCategory,
    consumedItems,
    omitMeats,
    omitSeafoods,
    omitDairy,
  ]);

  async function addItems(itemsArray) {
    setIsLoading(true);
    try {
      const preparedItems = itemsArray.map(item => {
        const parentItem = ingredients.find(ingredient =>
          ingredient.subItems?.some(
            subItem => subItem.item_id === item.item_id,
          ),
        );
        const expInt = item.exp_int || 5;

        if (parentItem) {
          return {
            name: `${item.name}`,
            exp_int: parentItem.exp_int || expInt,
            storage_tip: parentItem.storage_tip,
            whyEat: parentItem.whyEat,
            user: userEmail,
          };
        } else {
          return {
            name: item.name,
            exp_int: expInt,
            storage_tip: item.storage_tip,
            whyEat: item.whyEat,
            user: userEmail,
          };
        }
      });
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: preparedItems,
          userEmail: userEmail,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const updatedItems = items.filter(item => !itemsArray.includes(item));
      setItems(updatedItems);
      navigation.navigate('Kitchen', {itemsAdded: true});
      return data;
    } catch (error) {
      console.error('Error adding items:', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const renderItem = ({item}) => {
    const isSelected = selectedItems.includes(item);
    const isExpanded = expandedItems.includes(item);
    const itemImage = item.img ? item.img : chefLogo;
    const itemExpInt = item.exp_int ? `${item.exp_int} days` : 'N/A';

    const renderSubItem = (subItem, parentItemId) => (
      <TouchableOpacity
        key={`${parentItemId}-${subItem.item_id}`}
        style={[
          styles.subItem,
          selectedItems.includes(subItem) && styles.selectedSubItem,
        ]}
        onPress={() => toggleSelection(subItem)}>
        <Text
          style={[
            styles.subItemText,
            selectedItems.includes(subItem) && styles.selectedSubItemText,
          ]}>
          {capitalizeWords(subItem.name)}
        </Text>
      </TouchableOpacity>
    );

    const handlePress = () => {
      toggleSelection(item);
      if (isExpanded) {
        setExpandedItems(
          expandedItems.filter(expandedItem => expandedItem !== item),
        );
      } else {
        setExpandedItems([...expandedItems, item]);
      }
    };

    return (
      <View>
        <TouchableOpacity
          style={[styles.item, isSelected && styles.selectedItem]}
          onPress={handlePress}>
          <Image source={itemImage} style={styles.itemImage} />
          <Text
            style={[styles.itemText, isSelected && styles.selectedItemText]}>
            {capitalizeWords(item.name)}
          </Text>
          <Text
            style={(styles.itemExpInt, isSelected && styles.selectedItemText)}>
            Use-By: {itemExpInt}
          </Text>
        </TouchableOpacity>
        {isExpanded && item.subItems && (
          <View style={styles.subItemsContainer}>
            {item.subItems.map(subItem => renderSubItem(subItem, item.item_id))}
          </View>
        )}
      </View>
    );
  };

  const renderTab = category => {
    const isSelected = category === currentCategory;
    return (
      <TouchableOpacity
        key={category}
        style={[styles.tab, isSelected && styles.selectedTab]}
        onPress={() => setCurrentCategory(category)}>
        <Text style={[styles.tabText, isSelected && styles.selectedTabText]}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
          style={styles.scrollViewStyle}>
          {availableCategories.map(renderTab)}
        </ScrollView>
        <FlatList
          contentContainerStyle={{paddingBottom: 120}}
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.item_id}
          extraData={selectedItems}
        />
      </View>
      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#495057" />
        ) : (
          <View style={styles.selectedWrapper}>
            <Text style={styles.counterText}>
              Items Selected: {selectedItems.length}
            </Text>
            <Pressable
              disabled={selectedItems.length === 0}
              onPress={() => addItems(selectedItems)}
              style={({pressed}) => [
                styles.button,
                {backgroundColor: pressed ? 'rgba(0, 0, 255, 0.5)' : '#228B22'},
                selectedItems.length === 0 && styles.disabledButton,
              ]}>
              <Text
                style={[
                  styles.saveText,
                  selectedItems.length !== 0 && styles.whiteText,
                ]}>
                Save
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default MultiSelectScreen;
