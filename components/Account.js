import React, {useState} from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import {auth} from '../firebase';
import {signOut} from 'firebase/auth';
import styles from './styles/account';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wastedItems, setWastedItems] = useState([]);
  const [consumedItems, setConsumedItems] = useState([]);

  const userEmail = auth.currentUser?.email;
  const navigation = useNavigation();

  const apiUrl =
    'https://e5e0-2600-4041-54c4-7200-f4e2-fd46-3c43-5b25.ngrok-free.app';

  useFocusEffect(
    React.useCallback(() => {
      if (userEmail) {
        const fetchUserData = async () => {
          try {
            setLoading(true);
            const response = await fetch(
              `${apiUrl}/users/data?email=${encodeURIComponent(userEmail)}`,
            );
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setUserData(data);

            await fetchItemsData(userEmail);
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          } finally {
            setLoading(false);
          }
        };

        const fetchItemsData = async userEmail => {
          try {
            const response = await fetch(
              `${apiUrl}/items/useremail/${userEmail}`,
            );
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setWastedItems(data.wastedItems);
            setConsumedItems(data.consumedItems);
          } catch (error) {
            console.error('Error fetching items data:', error.message);
          }
        };

        fetchUserData();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text style={styles.titleText}>
            {userData?.firstName}'s Kitchen Stats
          </Text>
          <Text style={styles.item}>
            Total items logged: {userData?.itemsCreated}
          </Text>
          <View style={styles.itemsList}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'left',
                alignItems: 'center',
              }}>
              <Text style={styles.sectionHeader}>Top 5 Consumed Items</Text>
              <AntDesignIcon
                style={{marginLeft: 10}}
                name="like2"
                size={20}
                color="green"
              />
            </View>

            {consumedItems.slice(0, 5).map(item => (
              <Text key={item._id} style={styles.item}>
                {item.name} ({item.frequency})
              </Text>
            ))}
          </View>
          <View style={styles.itemsList}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'left',
                alignItems: 'center',
              }}>
              <Text style={styles.sectionHeader}>Top 5 Wasted Items</Text>

              <AntDesignIcon
                style={{marginLeft: 10}}
                name="dislike2"
                size={20}
                color="red"
              />
            </View>

            {wastedItems.slice(0, 5).map(item => (
              <Text key={item._id} style={styles.item}>
                {item.name} ({item.frequency})
              </Text>
            ))}
          </View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleLogout}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Account;
