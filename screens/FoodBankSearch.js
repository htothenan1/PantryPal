import React, {useState} from 'react';
import {View, TextInput, FlatList, Text, TouchableOpacity} from 'react-native';
import foodBanks from './data/dummy_data.json';
import styles from './styles/foodBankSearch';

const FoodBankSearch = ({navigation}) => {
  const [zipCode, setZipCode] = useState('');
  const [filteredBanks, setFilteredBanks] = useState(foodBanks);

  const handleSearch = input => {
    setZipCode(input);
    if (input.length === 0) {
      setFilteredBanks(foodBanks);
    } else {
      const filtered = foodBanks.filter(bank =>
        bank.served_zip_codes.includes(parseInt(input)),
      );
      setFilteredBanks(filtered);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('Food Bank Details', {foodBank: item})
      }>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter zip code"
        value={zipCode}
        onChangeText={handleSearch}
        keyboardType="numeric"
      />
      <FlatList
        data={filteredBanks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default FoodBankSearch;
