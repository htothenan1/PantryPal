import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import foodBanks from './data/dummy_data.json'; // Import the JSON file

const FoodBankSearch = ({navigation}) => {
  const [zipCode, setZipCode] = useState('');
  const [filteredBanks, setFilteredBanks] = useState(foodBanks);

  const handleSearch = input => {
    setZipCode(input);
    if (input.length === 0) {
      setFilteredBanks(foodBanks); // Show all if input is empty
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
});

export default FoodBankSearch;
