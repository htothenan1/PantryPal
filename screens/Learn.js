import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {
  kitchenPrepModules,
  kitchenSkillsModules,
  beyondTheKitchenModules,
} from './data/modules';
import {ingredientModules} from './data/modules';
import {useNavigation} from '@react-navigation/core';
import styles from './styles/learn';

const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};
const {width} = Dimensions.get('window');
const cardWidth = (width * 2) / 4;

const Learn = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const navigation = useNavigation();

  const onViewRef = useRef(({changed}) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const renderModuleItems = ({item}) => {
    const title =
      item.title.length > 15 ? `${item.title.slice(0, 40)}...` : item.title;

    return (
      <TouchableOpacity
        onPress={() => navToModuleStack(item)}
        activeOpacity={1}
        style={{width: cardWidth, marginRight: 20}}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.footerText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const navToModuleStack = moduleObject => {
    navigation.navigate('ModuleStack', {
      screen: 'ModuleStartScreen',
      params: {module: moduleObject},
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.titleText}>Kitchen Prep</Text>
      <View style={styles.dashContainer}>
        <FlatList
          data={kitchenPrepModules}
          renderItem={renderModuleItems}
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
      <Text style={styles.titleText}>Food Knowledge</Text>
      <View style={styles.dashContainer}>
        <FlatList
          data={ingredientModules}
          renderItem={renderModuleItems}
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
      <Text style={styles.titleText}>Kitchen Skills</Text>
      <View style={styles.dashContainer}>
        <FlatList
          data={kitchenSkillsModules}
          renderItem={renderModuleItems}
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
          data={beyondTheKitchenModules}
          renderItem={renderModuleItems}
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
