import React from 'react';
import {
  // Button,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import styles from './styles/onboardingScreen';

const OnboardingScreen = ({route, navigation}) => {
  const {content, currentIndex} = route.params;

  const currentContent = content[currentIndex];
  const isLastContent = currentIndex === content.length - 1;

  const goToNextContent = () => {
    if (!isLastContent) {
      navigation.push('OnboardingScreen', {
        content: content,
        currentIndex: currentIndex + 1,
      });
    } else {
      navigation.navigate('Dashboard');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={currentContent.contentImage} style={styles.image} />
      <Text style={styles.titleText}>{currentContent.contentTitle}</Text>
      <ScrollView>
        {currentContent.contentText.map((text, index) => (
          <Text key={index} style={styles.contentText}>
            • {text}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.startButton}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={goToNextContent}>
          <Text style={styles.buttonText}>
            {isLastContent ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
