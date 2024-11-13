import React from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import chefLogo from '../assets/foodbankicon.png';

import styles from './styles/onboardingStartScreen';

const OnboardingStartScreen = ({route, navigation}) => {
  const {module} = route.params;

  const startModule = () => {
    navigation.navigate('OnboardingScreen', {
      content: module.content,
      currentIndex: 0,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.screenWrapper}>
        <View style={styles.imageWrapper}>
          <Image source={chefLogo} style={styles.image} />
        </View>
        <Text style={styles.titleText}>Welcome to FeedLink!</Text>
        <Text style={styles.introText}>
          The purpose of this app is to help you reduce your food waste by
          following a simple 3-step cycle:
        </Text>
        {/* <Text style={styles.introText}>Current Features:</Text> */}
        <View style={styles.overviewContainer}>
          {/* <Text style={styles.overviewTitle}>Topics covered:</Text> */}

          <Text style={styles.bulletText}>• Log Your Foods</Text>
          <Text style={styles.bulletText}>• Set SMART Kitchen Goals</Text>
          <Text style={styles.bulletText}>• Learn Continuously</Text>
        </View>
        {/* <Text style={styles.introText}>
          While we aim to make these actions as easy and rewarding as possible
          to do, it will still take some effort!
        </Text> */}
      </ScrollView>

      <View style={styles.startButton}>
        <TouchableOpacity style={styles.buttonContainer} onPress={startModule}>
          <Text style={styles.buttonText}>Begin Tutorial</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingStartScreen;
