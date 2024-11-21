import React from 'react';
import {
  ScrollView,
  Text,
  Linking,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from './styles/foodBankDetails';

const FoodBankDetails = ({route}) => {
  const {foodBank} = route.params;

  const handleDial = phone => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{foodBank.name}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.detail}>{foodBank.address}</Text>

        <Text style={styles.label}>Hours:</Text>
        <Text style={styles.detail}>{foodBank.hours_of_operation}</Text>

        {foodBank.phone && (
          <>
            <Text style={styles.label}>Phone Number:</Text>
            <TouchableOpacity onPress={() => handleDial(foodBank.phone)}>
              <Text style={styles.phone}>{foodBank.phone}</Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.label}>Languages:</Text>
        <Text style={styles.detail}>{foodBank.languages}</Text>

        {/* <Text style={styles.label}>Served Zips:</Text>
        <Text style={styles.detail}>
          {foodBank.served_zip_codes.join(', ')}
        </Text> */}

        <Text style={styles.label}>Eligibility:</Text>
        <Text style={styles.detail}>{foodBank.eligibility_requirements}</Text>

        {foodBank.additional_information && (
          <>
            <Text style={styles.label}>Additional Information:</Text>
            <Text style={styles.detail}>{foodBank.additional_information}</Text>
          </>
        )}

        {foodBank.website_url && (
          <TouchableOpacity
            onPress={() => Linking.openURL(foodBank.website_url)}>
            <Text style={styles.link}>Visit {foodBank.name}’s Website</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoodBankDetails;
