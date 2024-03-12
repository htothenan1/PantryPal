import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './styles/moduleStartScreen';

const ModuleStartScreen = ({route, navigation}) => {
  const {module} = route.params;

  const startModule = () => {
    navigation.navigate('ModuleScreen', {
      content: module.content,
      currentIndex: 0,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={module.image} style={styles.image} />

      <Text style={styles.titleText}>All About {module.title}</Text>
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Topics covered in this module:</Text>
        {module.content.map((item, index) => (
          <Text key={index} style={styles.bulletText}>
            • {item.contentTitle}
          </Text>
        ))}
      </View>
      <Text style={styles.introText}>{module.intro}</Text>

      <View style={styles.startButton}>
        <TouchableOpacity style={styles.buttonContainer} onPress={startModule}>
          <Text style={styles.buttonText}>Start Module</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModuleStartScreen;
