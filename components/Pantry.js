import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {auth} from '../firebase'; // Adjust the path as needed
const API_URL = 'https://flavr-413021.ue.r.appspot.com/';

const pantryItems = [
  'White Rice',
  'Basmati Rice',
  'Jasmine Rice',
  'Arborio Rice',
  'Brown Rice',
  'Sushi Rice',
  'Spaghetti',
  'Penne',
  'Fettuccine',
  'Macaroni',
  'Linguine',
  'Fusilli',
  'Lasagna',
  'Angel Hair',
  'Rigatoni',
  'Rotini',
  'Black Beans',
  'Pinto Beans',
  'Kidney Beans',
  'Garbanzo Beans',
  'Cannellini Beans',
  'Navy Beans',
  'Lima Beans',
  'Canned Tomatoes',
  'Olive Oil',
  'Canola Oil',
  'Vegetable Oil',
  'Coconut Oil',
  'Avocado Oil',
  'Sunflower Oil',
  'Grapeseed Oil',
  'Peanut Oil',
  'Sesame Oil',
  'Corn Oil',
  'Table Salt',
  'Kosher Salt',
  'Sea Salt',
  'Fleur de Sel',
  'Himalayan Pink Salt',
  'Black Pepper',
  'White Pepper',
  'All-Purpose Flour',
  'Bread Flour',
  'Cake Flour',
  'Tapioca Flour',
  'Granulated Sugar',
  'Brown Sugar',
  'Powdered Sugar',
  'Raw Sugar',
  'Superfine Sugar',
  'Baking Soda',
  'Baking Powder',
  'White Wine Vinegar',
  'Apple Cider Vinegar',
  'Rice Vinegar',
  'Balsamic Vinegar',
  'Red Wine Vinegar',
  'Rolled Oats',
  'Steel-Cut Oats',
  'Oat Bran',
  'Oats',
  'Peanut Butter',
  'Cereal',
  'Tea',
  'Coffee',
];

const Pantry = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [animations, setAnimations] = useState(
    pantryItems.reduce((acc, item) => {
      acc[item] = {
        size: new Animated.Value(100), // Single animated value for size
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

  const handleLongPress = item => {
    setExpandedItem(item === expandedItem ? null : item);
    Animated.timing(animations[item].size, {
      toValue: item === expandedItem ? 100 : 150, // Adjusted size for expansion
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

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
              onLongPress={() => handleLongPress(item)}>
              <Animated.View
                style={[
                  {
                    width: animations[item].size,
                    height: animations[item].size,
                    borderRadius: animations[item].size.interpolate({
                      inputRange: [100, 150],
                      outputRange: [50, 75], // Half of the size for perfect circle
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
                  {item}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b4965',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    fontFamily: 'Avenir-Book',
  },
  bubbleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  bubble: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBubble: {
    backgroundColor: 'white',
    borderRadius: 50,
  },
  unselectedBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: 'white', // Add white border to unselected items
    borderRadius: 50,
  },
  bubbleText: {
    fontSize: 16,
    fontFamily: 'Avenir-Book',
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  selectedText: {
    color: 'black',
  },
  unselectedText: {
    color: 'white',
  },
  expandedBubble: {
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  expandedText: {
    fontSize: 24,
    marginBottom: 10,
  },
  expandedInfoText: {
    color: 'black',
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'Avenir-Book',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  nextButtonText: {
    color: '#1b4965',
    fontSize: 16,
    fontFamily: 'Avenir-Book',
  },
});

export default Pantry;
