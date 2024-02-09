import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {auth} from '../firebase';
import styles from './styles/learn';
import {useNavigation} from '@react-navigation/core';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import {BarChart} from 'react-native-chart-kit';
import firstStep from '../assets/first_step.png';
import foodRespect from '../assets/food_respect.png';
// import savingMoney from '../assets/saving_money.png';
import kitchenPrep from '../assets/kitchen_prep.png';
import homeCooking from '../assets/home_cooking.png';
import motherSauces from '../assets/mother_sauces.png';
import potatoArt from '../assets/potato_art.png';
import avoArt from '../assets/avo_art.png';
import appleArt from '../assets/apple_art.png';
import onionArt from '../assets/onion_art.png';

const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};

const Learn = () => {
  //   const [loading, setLoading] = useState(true);
  const [wastedItems, setWastedItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [consumedItems, setConsumedItems] = useState([]);
  const flatListRef = useRef(null);

  const userEmail = auth.currentUser?.email;
  const API_URL = 'https://flavr-413021.ue.r.appspot.com/';

  const navigation = useNavigation();

  //   useFocusEffect(
  //     React.useCallback(() => {
  //       if (userEmail) {
  //         const fetchUserData = async () => {
  //           try {
  //             setLoading(true);
  //             await fetchItemsData(userEmail);
  //           } catch (error) {
  //             console.error('Error fetching user data:', error.message);
  //           } finally {
  //             setLoading(false);
  //           }
  //         };

  //         const fetchItemsData = async emailString => {
  //           try {
  //             const response = await fetch(
  //               `${API_URL}/items/useremail/${emailString}`,
  //             );
  //             if (!response.ok) {
  //               throw new Error(`HTTP error! Status: ${response.status}`);
  //             }
  //             const res = await response.json();
  //             setWastedItems(res.wastedItems);
  //             setConsumedItems(res.consumedItems);
  //           } catch (error) {
  //             console.error('Error fetching items data:', error.message);
  //           }
  //         };

  //         fetchUserData();
  //       }
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  //     }, []),
  //   );

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

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const consumedLabels = consumedItems.slice(0, 5).map(item => item.name);
  const consumedData = consumedItems.slice(0, 5).map(item => item.frequency);
  const wastedLabels = wastedItems.slice(0, 5).map(item => item.name);
  const wastedData = wastedItems.slice(0, 5).map(item => item.frequency);

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
      {/* <View style={styles.chartContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Top 5 Consumed Items</Text>
              <AntDesignIcon
                style={styles.headerIcon}
                name="like2"
                size={20}
                color="green"
              />
            </View>
            <BarChart
              data={{
                labels: consumedLabels,
                datasets: [{data: consumedData}],
              }}
              width={Dimensions.get('window').width - 30}
              height={300}
              yAxisLabel=""
              chartConfig={chartConfig}
              verticalLabelRotation={30}
              fromZero={true}
              withInnerLines={false}
            />
          </View>

          <View style={styles.chartContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Top 5 Wasted Items</Text>

              <AntDesignIcon
                style={styles.headerIcon}
                name="dislike2"
                size={20}
                color="red"
              />
            </View>
            <BarChart
              data={{
                labels: wastedLabels,
                datasets: [{data: wastedData}],
              }}
              width={Dimensions.get('window').width - 30}
              height={300}
              yAxisLabel=""
              chartConfig={chartConfig}
              verticalLabelRotation={30}
              fromZero={true}
              withInnerLines={false}
            />
          </View> */}
    </ScrollView>
  );
};

export default Learn;
