import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Switch,
} from 'react-native';
import {auth} from '../firebase';
import {signOut} from 'firebase/auth';
import styles from './styles/account';
import {useNavigation} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {icons} from './data/icons';

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wastedItems, setWastedItems] = useState([]);
  const [consumedItems, setConsumedItems] = useState([]);
  const [isIconPickerVisible, setIconPickerVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [omitMeats, setOmitMeats] = useState(false);
  const [omitSeafoods, setOmitSeafoods] = useState(false);
  const [omitDairy, setOmitDairy] = useState(false); // New state for omitting dairy

  const userEmail = auth.currentUser?.email;
  const navigation = useNavigation();

  const API_URL = 'https://flavr-413021.ue.r.appspot.com/';

  const updateIconName = async selectedIconName => {
    try {
      const response = await fetch(`${API_URL}/users/icon`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          iconName: selectedIconName,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
    } catch (error) {
      console.error('Error updating icon name:', error);
    }
  };

  const updatePreferences = async (meats, seafoods, dairy) => {
    try {
      const response = await fetch(`${API_URL}/users/preferences`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          omitMeats: meats,
          omitSeafoods: seafoods,
          omitDairy: dairy, // Include omitDairy in the request
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  useEffect(() => {
    if (userData?.iconName) {
      const foundIcon = icons.find(
        icon => icon.name === userData.iconName,
      )?.img;
      if (foundIcon) {
        setSelectedIcon(foundIcon);
      } else {
        console.log('Icon not found:', userData.iconName);
      }
    }

    if (userData) {
      setOmitMeats(userData.omitMeats);
      setOmitSeafoods(userData.omitSeafoods);
      setOmitDairy(userData.omitDairy); // Set omitDairy from userData
    }
  }, [userData]);

  useFocusEffect(
    React.useCallback(() => {
      if (userEmail) {
        const fetchUserData = async () => {
          try {
            setLoading(true);
            const response = await fetch(
              `${API_URL}/users/data?email=${userEmail}`,
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

        const fetchItemsData = async emailString => {
          try {
            const response = await fetch(
              `${API_URL}/items/useremail/${emailString}`,
            );
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const res = await response.json();
            setWastedItems(res.wastedItems);
            setConsumedItems(res.consumedItems);
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
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#495057" />
      ) : (
        <ScrollView>
          <View style={styles.accountInfoWrapper}>
            <TouchableOpacity onPress={() => setIconPickerVisible(true)}>
              {selectedIcon ? (
                <Image source={selectedIcon} style={styles.accountImage} />
              ) : (
                <View style={styles.accountImageDefault}>
                  <AntDesignIcon name="user" size={50} color="black" />
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{userData?.firstName}</Text>
              <Text style={styles.levelText}>Level {userData?.level}</Text>
              <Text style={styles.item}>
                Total Items Logged: {userData?.itemsCreated}
              </Text>
            </View>
          </View>

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Omit Meats:</Text>
            <Switch
              value={omitMeats}
              onValueChange={value => {
                setOmitMeats(value);
                updatePreferences(value, omitSeafoods, omitDairy);
              }}
            />
          </View>

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Omit Seafoods:</Text>
            <Switch
              value={omitSeafoods}
              onValueChange={value => {
                setOmitSeafoods(value);
                updatePreferences(omitMeats, value, omitDairy);
              }}
            />
          </View>

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Omit Dairy:</Text>
            <Switch
              value={omitDairy}
              onValueChange={value => {
                setOmitDairy(value);
                updatePreferences(omitMeats, omitSeafoods, value);
              }}
            />
          </View>

          <View style={styles.itemsList}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Top 5 Consumed Items</Text>
              <AntDesignIcon
                style={styles.headerIcon}
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
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Top 5 Wasted Items</Text>
              <AntDesignIcon
                style={styles.headerIcon}
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

          <Modal
            visible={isIconPickerVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIconPickerVisible(false)}>
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setIconPickerVisible(false)}
              activeOpacity={1}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitleText}>Choose your Icon</Text>
                <ScrollView>
                  {icons.map((icon, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedIcon(icon.img);
                        updateIconName(icon.name);
                        setIconPickerVisible(false);
                      }}
                      style={styles.modalItemButton}>
                      <Image source={icon.img} style={styles.modalItemImage} />
                      <Text>{icon.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      )}
      <View style={styles.startButton}>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Account;
