import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const FoodBankDetails = ({route}) => {
  const {foodBank} = route.params;

  // Function to handle phone dialing
  const handleDial = phone => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Food Bank Name (Title) */}
        <Text style={styles.title}>{foodBank.name}</Text>

        {/* Address */}
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.detail}>{foodBank.address}</Text>

        {/* Hours */}
        <Text style={styles.label}>Hours:</Text>
        <Text style={styles.detail}>{foodBank.hours_of_operation}</Text>

        {/* Phone Number (if present) */}
        {foodBank.phone && (
          <>
            <Text style={styles.label}>Phone Number:</Text>
            <TouchableOpacity onPress={() => handleDial(foodBank.phone)}>
              <Text style={styles.phone}>{foodBank.phone}</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Languages */}
        <Text style={styles.label}>Languages:</Text>
        <Text style={styles.detail}>{foodBank.languages}</Text>

        {/* Served Zips */}
        <Text style={styles.label}>Served Zips:</Text>
        <Text style={styles.detail}>
          {foodBank.served_zip_codes.join(', ')}
        </Text>

        {/* Eligibility */}
        <Text style={styles.label}>Eligibility:</Text>
        <Text style={styles.detail}>{foodBank.eligibility_requirements}</Text>

        {/* Additional Information (if present) */}
        {foodBank.additional_information && (
          <>
            <Text style={styles.label}>Additional Information:</Text>
            <Text style={styles.detail}>{foodBank.additional_information}</Text>
          </>
        )}

        {/* Website URL (if present) */}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  phone: {
    fontSize: 16,
    marginBottom: 5,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  link: {
    fontSize: 16,
    color: 'green',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default FoodBankDetails;
