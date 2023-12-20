import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, FlatList, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import styles from './styles/multiSelect';
import {ingredients} from './data/ingredients';

const MultiSelectScreen = ({route}) => {
  const [items, setItems] = useState(ingredients);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);

  const navigation = useNavigation();

  const toggleSelection = item => {
    let newSelectedItems = [...selectedItems];
    let newExpandedItems = [...expandedItems];

    const parentItem = ingredients.find(ingredient =>
      ingredient.subItems?.includes(item),
    );

    if (parentItem) {
      newSelectedItems = newSelectedItems.filter(i => i !== parentItem); // Unselect parent
      if (!newSelectedItems.includes(item)) {
        newSelectedItems.push(item);
        if (!newExpandedItems.includes(parentItem)) {
          newExpandedItems.push(parentItem);
        }
      } else {
        newSelectedItems = newSelectedItems.filter(i => i !== item); // Unselect sub-item
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

    setItems(filteredItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addItems(itemsArray) {
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
          };
        } else {
          return {
            name: item.name,
            exp_int: item.exp_int,
            storage_tip: item.storage_tip,
          };
        }
      });
      const response = await fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({items: preparedItems}),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const updatedItems = items.filter(item => !itemsArray.includes(item));
      setItems(updatedItems);
      navigation.navigate('Dashboard');
      return data;
    } catch (error) {
      console.error('Error adding items:', error.message);
    }
  }

  const renderItem = ({item}) => {
    const isSelected = selectedItems.includes(item);
    const isExpanded = expandedItems.includes(item);

    const renderSubItem = (subItem, parentItemId) => (
      <TouchableOpacity
        key={`${parentItemId}-${subItem.item_id}`} // Unique key for each sub-item
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

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.item_id}
        extraData={selectedItems}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          disabled={selectedItems.length === 0}
          onPress={() => addItems(selectedItems)}
          style={styles.button}>
          <Text
            style={
              styles.buttonText
            }>{`Add Items (${selectedItems.length})`}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MultiSelectScreen;
