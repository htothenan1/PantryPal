/* eslint-disable no-shadow */
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/core';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {auth} from '../firebase';
import styles from './styles/cameraPage';
import {ingredients} from './data/ingredients';

const CameraPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState('');
  const [mode, setMode] = useState('groceries');

  const camera = useRef(null);
  const device = useCameraDevice('back');
  const userEmail = auth.currentUser?.email;
  const navigation = useNavigation();

  const API_URL = 'https://flavr-413021.ue.r.appspot.com/';
  // const API_URL = 'https://localhost:3000/';

  const capturePhoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      setShowCamera(false);
      console.log(photo.path);
      console.log(mode);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'groceries' ? 'receipt' : 'groceries');
  };

  async function addCustomItem(itemName) {
    try {
      const existingIngredient = ingredients.find(
        ingredient => ingredient.name.toLowerCase() === itemName.toLowerCase(),
      );

      let storageTip = 'Not available';
      let expInt = 6;

      if (existingIngredient) {
        storageTip = existingIngredient.storage_tip;
        expInt = existingIngredient.exp_int;
      } else {
        const tipResponse = await fetch(`${API_URL}/generateStorageTip`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({item: itemName}),
        });

        if (!tipResponse.ok) {
          console.error(`HTTP error! Status: ${tipResponse.status}`);
        } else {
          const tipData = await tipResponse.json();
          storageTip = tipData.storageTip;
        }
      }

      const newItem = {
        name: itemName,
        exp_int: expInt,
        storage_tip: storageTip,
        user: userEmail,
      };

      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [newItem],
          userEmail: userEmail,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Body: ${errorBody}`,
        );
      }

      await response.json();
    } catch (error) {
      console.error('Error adding custom item:', error);
    }
  }

  const confirmPhoto = (imageFilePath, currentMode) => {
    setIsLoading(true);

    const data = new FormData();
    data.append('image', {
      uri: imageFilePath,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    data.append('userEmail', userEmail);
    data.append('mode', currentMode);

    console.log('this the data', data);

    fetch(`${API_URL}/analyzeImage`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('Raw Response:', response);
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then(text => {
            throw new Error(text);
          });
        }
      })
      .then(data => {
        console.log('Success:', data);
        if (Array.isArray(data)) {
          data.forEach(itemName => {
            addCustomItem(itemName);
          });
        }
        setIsLoading(false);
        navigation.navigate('Dashboard', {itemsAdded: true});
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (device !== null) {
      setShowCamera(true);
    }
  }, [device]);

  if (device == null) {
    return <Text>Camera Not Available</Text>;
  }

  return (
    <View style={styles.container}>
      {showCamera ? (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera}
            photo={true}
          />

          <View style={styles.buttonContainer}>
            {/* <View style={styles.modeToggleContainer}>
              <TouchableOpacity
                onPress={toggleMode}
                style={styles.modeToggleButton}>
                <Text style={styles.modeToggleButtonText}>
                  {mode === 'groceries'
                    ? 'Switch to Receipt Mode'
                    : 'Switch to Groceries Mode'}
                </Text>
              </TouchableOpacity>
            </View> */}
            <TouchableOpacity
              style={styles.camButton}
              onPress={() => capturePhoto()}>
              <AntDesignIcon
                name={mode === 'groceries' ? 'shoppingcart' : 'filetext1'}
                size={40}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {imageSource !== '' ? (
            <Image
              style={styles.image}
              source={{
                uri: `file://'${imageSource}`,
              }}
            />
          ) : null}

          <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.retakeButton}
                onPress={() => setShowCamera(true)}>
                <Text style={styles.retakeText}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.usePhotoButton}
                onPress={() => confirmPhoto(imageSource, mode)}
                disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#495057" />
                ) : (
                  <Text style={styles.usePhotoText}>Use Photo</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CameraPage;
