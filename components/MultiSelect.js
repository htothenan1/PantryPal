import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {auth} from '../firebase';
import styles from './styles/multiSelect';
import {ingredients} from './data/ingredients';

const MultiSelectScreen = ({route}) => {
  const [items, setItems] = useState(ingredients);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('fruits');
  const [isLoading, setIsLoading] = useState(false);

  const userEmail = auth.currentUser?.email;
  const navigation = useNavigation();
  const API_URL = 'https://flavr-413021.ue.r.appspot.com/';

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
    const itemsFromDashboard = route.params?.items.map(item => item.name) || [];

    const filteredItems = ingredients.filter(ingredient => {
      if (itemsFromDashboard.includes(ingredient.name)) {
        return false;
      }

      if (ingredient.subItems) {
        const filteredSubItems = ingredient.subItems.filter(
          subItem => !itemsFromDashboard.includes(subItem.name),
        );
        if (filteredSubItems.length === 0) {
          return false;
        } else {
          ingredient.subItems = filteredSubItems;
        }
      }

      return true;
    });

    const filteredItemsByCategory = filteredItems.filter(
      ingredient => ingredient.category === currentCategory,
    );

    setItems(filteredItemsByCategory);
  }, [route, currentCategory]);

  async function addItems(itemsArray) {
    setIsLoading(true);
    try {
      const preparedItems = itemsArray.map(item => {
        const parentItem = ingredients.find(ingredient =>
          ingredient.subItems?.some(
            subItem => subItem.item_id === item.item_id,
          ),
        );
        if (parentItem) {
          return {
            name: `${item.name}`,
            exp_int: parentItem.exp_int,
            storage_tip: parentItem.storage_tip,
            user: userEmail,
          };
        } else {
          return {
            name: item.name,
            exp_int: item.exp_int,
            storage_tip: item.storage_tip,
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
      navigation.navigate('Dashboard', {itemsAdded: true});
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
          {subItem.name}
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
          <Text
            style={[styles.itemText, isSelected && styles.selectedItemText]}>
            {item.name}
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
      <View style={styles.tabsContainer}>
        {['fruits', 'vegetables', 'meats', 'dairy', 'grains', 'seafoods'].map(
          renderTab,
        )}
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.item_id}
        extraData={selectedItems}
      />
      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#495057" />
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text style={styles.counterText}>
              Items Selected: {selectedItems.length}
            </Text>
            <Pressable
              disabled={selectedItems.length === 0}
              onPress={() => addItems(selectedItems)}
              style={({pressed}) => [
                styles.button,
                {backgroundColor: pressed ? 'rgba(0, 0, 255, 0.5)' : '#76c893'},
                selectedItems.length === 0 && styles.disabledButton,
              ]}>
              <Text style={styles.saveText}>Save</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default MultiSelectScreen;
