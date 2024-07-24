import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  // Easing,
} from 'react-native';
import {API_URL} from '@env';
import {pantryItems} from './data/itemNames';
import {capitalizeWords} from './helpers/functions';
import {useNavigation} from '@react-navigation/core';
import {auth} from '../firebase';
import styles from './styles/pantry';

const Pantry = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [animations, setAnimations] = useState(
    pantryItems.reduce((acc, item) => {
      acc[item] = {
        size: new Animated.Value(100),
      };
      return acc;
    }, {}),
  );

  const userEmail = auth.currentUser?.email;
  const navigation = useNavigation();

  useEffect(() => {
    fetchPantryItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPantryItems = async () => {
    try {
      const response = await fetch(`${API_URL}/pantryItems?email=${userEmail}`);
      const data = await response.json();
      const itemNames = data.map(item => item.itemName);
      setSelectedItems(itemNames);
    } catch (error) {
      console.error('Error fetching pantry items:', error);
    }
  };

  const toggleItemSelection = item => {
    setSelectedItems(prevSelectedItems =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter(i => i !== item)
        : [...prevSelectedItems, item],
    );
  };

  const savePantryItems = async () => {
    try {
      await fetch(`${API_URL}/pantryItems`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({items: selectedItems, userEmail}),
      });
      navigation.navigate('MyAccount');
    } catch (error) {
      console.error('Error saving pantry items:', error);
    }
  };

  // const handleLongPress = item => {
  //   setExpandedItem(item === expandedItem ? null : item);
  //   Animated.timing(animations[item].size, {
  //     toValue: item === expandedItem ? 100 : 150, // Adjusted size for expansion
  //     duration: 300,
  //     easing: Easing.inOut(Easing.ease),
  //     useNativeDriver: false,
  //   }).start();
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Pantry</Text>
      <ScrollView contentContainerStyle={styles.bubbleContainer}>
        {pantryItems.map((item, index) => {
          const isSelected = selectedItems.includes(item);
          const isExpanded = item === expandedItem;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.bubble,
                isSelected ? styles.selectedBubble : styles.unselectedBubble,
              ]}
              onPress={() => toggleItemSelection(item)}
              // onLongPress={() => handleLongPress(item)}
            >
              <Animated.View
                style={[
                  {
                    width: animations[item].size,
                    height: animations[item].size,
                    borderRadius: animations[item].size.interpolate({
                      inputRange: [100, 150],
                      outputRange: [50, 75],
                    }),
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  isExpanded ? styles.expandedBubble : null,
                ]}>
                <Text
                  style={[
                    styles.bubbleText,
                    isSelected ? styles.selectedText : styles.unselectedText,
                    isExpanded ? styles.expandedText : null,
                  ]}>
                  {capitalizeWords(item)}
                </Text>
                {isExpanded && (
                  <Text style={styles.expandedInfoText}>
                    This is the {item}
                  </Text>
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity onPress={savePantryItems} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pantry;
