import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import {auth} from '../firebase';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import styles from './styles/account';
import {useNavigation} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userEmail = auth.currentUser?.email;
  const navigation = useNavigation();

  const apiUrl =
    'https://f41e-2600-4041-54c4-7200-2cf9-b5db-d2b0-abf7.ngrok-free.app';

  useFocusEffect(
    React.useCallback(() => {
      if (userEmail) {
        // Define the function inside the effect
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
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          } finally {
            setLoading(false);
          }
        };

        // Call the function
        fetchUserData();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  //   useFocusEffect(
  //     React.useCallback(() => {
  //     if (userEmail) {
  //       // Define the function inside the effect
  //       const fetchUserData = async () => {
  //         try {
  //           setLoading(true);
  //           const response = await fetch(
  //             `${apiUrl}/users/data?email=${encodeURIComponent(userEmail)}`,
  //           );
  //           if (!response.ok) {
  //             throw new Error(`HTTP error! Status: ${response.status}`);
  //           }
  //           const data = await response.json();
  //           setUserData(data);
  //         } catch (error) {
  //           console.error('Error fetching user data:', error.message);
  //         } finally {
  //           setLoading(false);
  //         }
  //       };

  //       // Call the function
  //       fetchUserData();
  //     }
  //   }, [userEmail]);

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
          {/* <Text style={styles.titleText}>{userEmail.toUpperCase()}</Text> */}
          <Text style={styles.titleText}>Hi {userData?.firstName}!</Text>
          <Text style={styles.info}>
            Total items logged: {userData?.itemsCreated}
          </Text>
          {/* <Text style={styles.info}>
            Items Deleted: {userData?.itemsDeleted.total}
          </Text> */}
          {/* <Text style={styles.info}>
            Deleted by Undo: {userData?.itemsDeleted.byUndo}
          </Text> */}
          <Text style={styles.info}>
            Items consumed with waste: {userData?.itemsDeleted.byWaste}
          </Text>
          <Text style={styles.info}>
            Items consumed without waste: {userData?.itemsDeleted.byConsume}
          </Text>
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
