import React from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import chefLogo from '../assets/chefs_hat.png';

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
      {/* <Image source={module.image} style={styles.image} /> */}
      <ScrollView style={{marginBottom: 80}}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            source={chefLogo}
            style={{
              height: 80,
              width: 80,
            }}
          />
        </View>
        <Text style={styles.titleText}>Welcome to FlavrAi!</Text>
        <Text style={styles.introText}>
          The purpose of this app is to help you manage and consume your foods
          more efficiently, in a fun and intuitive way.
        </Text>
        <Text style={styles.introText}>
          We do this by empowering the user to focus on regularly achieving The
          3 Core Actions:
        </Text>
        <View style={styles.overviewContainer}>
          {/* <Text style={styles.overviewTitle}>Topics covered:</Text> */}

          <Text style={styles.bulletText}>• Logging Your Items</Text>
          <Text style={styles.bulletText}>• Setting SMART Goals</Text>
          <Text style={styles.bulletText}>• Learning Kitchen Skills</Text>
        </View>
        <Text style={styles.introText}>
          While we aim to make these actions as easy and rewarding as possible
          to do, it will still take some consistent effort on your part!
        </Text>
      </ScrollView>
      {/* <Text style={styles.introText}>
        And on top of your already hectic life, it's hard to imagine finding the
        time for any new efforts...
      </Text> */}

      <View style={styles.startButton}>
        <TouchableOpacity style={styles.buttonContainer} onPress={startModule}>
          <Text style={styles.buttonText}>But hear me out!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingStartScreen;
