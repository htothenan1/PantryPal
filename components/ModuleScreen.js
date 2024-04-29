import React from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import styles from './styles/moduleScreen';

const ModuleScreen = ({route, navigation}) => {
  const {content, currentIndex} = route.params;
  const currentContent = content[currentIndex];
  const isLastContent = currentIndex === content.length - 1;

  const goToNextContent = () => {
    if (!isLastContent) {
      navigation.push('ModuleScreen', {
        content: content,
        currentIndex: currentIndex + 1,
      });
    } else {
      navigation.navigate('Learn');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{marginBottom: 80}}>
        <Image source={currentContent.contentImage} style={styles.image} />
        <Text style={styles.titleText}>{currentContent.contentTitle}</Text>
        <ScrollView>
          {currentContent.contentText.map((text, index) => (
            <Text key={index} style={styles.contentText}>
              • {text}
            </Text>
          ))}
        </ScrollView>
      </ScrollView>
      <View style={styles.startButton}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={goToNextContent}>
          <Text style={styles.buttonText}>
            {isLastContent ? 'Finish Module' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModuleScreen;
