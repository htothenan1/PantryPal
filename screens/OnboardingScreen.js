import React from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import chefLogo from '../assets/foodbankicon.png';
import swipeLeft from '../assets/swipeLeft.png';
import styles from './styles/onboardingScreen';
import {auth} from '../firebase';

const OnboardingScreen = ({route, navigation}) => {
  const {content, currentIndex} = route.params;
  const userEmail = auth.currentUser?.email;

  const currentContent = content[currentIndex];
  const isLastContent = currentIndex === content.length - 1;

  const goToNextContent = () => {
    if (!isLastContent) {
      navigation.push('OnboardingScreen', {
        content: content,
        currentIndex: currentIndex + 1,
      });
    } else {
      navigation.navigate('Kitchen');
    }
  };

  const finishOnboarding = async () => {
    await AsyncStorage.setItem(`hasCompletedOnboarding-${userEmail}`, 'true');

    navigation.navigate('Kitchen');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.screenWrapper}>
        {/* <View style={styles.imageWrapper}>
          <Image source={chefLogo} style={styles.image} />
        </View> */}

        <Text style={styles.titleText}>{currentContent.contentTitle}</Text>
        {currentContent.contentText.map((text, index) => (
          <Text key={index} style={styles.contentText}>
            {text}
          </Text>
        ))}
        <View style={styles.lowerImageWrapper}>
          <Image
            source={currentContent.contentImage}
            style={styles.lowerImage}
          />
        </View>
      </ScrollView>
      <View style={styles.startButton}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={isLastContent ? finishOnboarding : goToNextContent}>
          <Text style={styles.buttonText}>
            {isLastContent ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
