import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import styles from './styles/learn';
import {useNavigation} from '@react-navigation/core';
import firstStep from '../assets/first_step.png';
import foodRespect from '../assets/food_respect.png';
import kitchenPrep from '../assets/kitchen_prep.png';
import homeCooking from '../assets/home_cooking.png';
import motherSauces from '../assets/mother_sauces.png';
import potatoArt from '../assets/potato_art.png';
import avoArt from '../assets/avo_art.png';
import appleArt from '../assets/apple_art.png';
import onionArt from '../assets/onion_art.png';

const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};

const Learn = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const navigation = useNavigation();

  const culinarySkillsObjects = [
    {
      image: motherSauces,
      title: 'The 5 French Mother Sauces',
    },
    {
      image: homeCooking,
      title: 'Soups, Sauces, Smoothies, Salads, and Stirfries',
    },
  ];

  const latestArticlesObjects = [
    {
      image: firstStep,
      title: 'The First Step',
    },
    {
      image: foodRespect,
      title: 'Respecting The Food You Purchase',
    },
    {
      image: kitchenPrep,
      title: 'The Many Perks of a Tidy Kitchen',
    },
    {
      image: motherSauces,
      title: 'The 5 French Mother Sauces',
    },
    {
      image: homeCooking,
      title: 'Soups, Sauces, Smoothies, Salads, and Stirfries',
    },
  ];

  const featuredFoodObjects = [
    {
      image: potatoArt,
      title: 'Potatoes',
    },
    {
      image: onionArt,
      title: 'Onions',
    },
    {
      image: appleArt,
      title: 'Apples',
    },
    {
      image: avoArt,
      title: 'Avocados',
    },
  ];

  const beyondTheKitchenObjects = [
    {
      image: foodRespect,
      title: 'Respecting The Food You Purchase',
    },
    {
      image: firstStep,
      title: 'The First Step',
    },
  ];

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

  const navToArticleDetails = articleObject => {
    navigation.navigate('ArticleDetails', {
      article: articleObject,
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.titleText}>Latest Articles</Text>
      <View style={styles.dashContainer}>
        <FlatList
          data={latestArticlesObjects}
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
      <Text style={styles.titleText}>Culinary Skills</Text>
      <View style={styles.dashContainer}>
        <FlatList
          data={culinarySkillsObjects}
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
      <Text style={styles.titleText}>Featured Food</Text>
      <View style={styles.dashContainer}>
        <FlatList
          data={featuredFoodObjects}
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
      <Text style={styles.titleText}>Beyond the Kitchen</Text>
      <View style={styles.dashContainer}>
        <FlatList
          data={beyondTheKitchenObjects}
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
    </ScrollView>
  );
};

export default Learn;
