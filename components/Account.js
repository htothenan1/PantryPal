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
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {icons} from './data/icons';
import styles from './styles/account';

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wastedItems, setWastedItems] = useState([]);
  const [consumedItems, setConsumedItems] = useState([]);
  const [isIconPickerVisible, setIconPickerVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [omitMeats, setOmitMeats] = useState(false);
  const [omitSeafoods, setOmitSeafoods] = useState(false);
  const [omitDairy, setOmitDairy] = useState(false);
  const [showConsumedItems, setShowConsumedItems] = useState(false);
  const [showWastedItems, setShowWastedItems] = useState(false);

  const userEmail = auth.currentUser?.email;
  const navigation = useNavigation();

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
      setOmitDairy(userData.omitDairy);
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
          omitDairy: dairy,
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

  const navToPantry = () => {
    navigation.navigate('Pantry');
  };

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
        <View style={{marginTop: 250}}>
          <ActivityIndicator size="large" color="#495057" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.contentContainer}>
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
            </View>
          </View>

          <View style={styles.preferencesContainer}>
            <Text style={styles.preferencesTitle}>Kitchen Preferences</Text>
            <View style={{marginBottom: 10}}>
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>Remove Meats:</Text>
                <Switch
                  value={omitMeats}
                  onValueChange={value => {
                    setOmitMeats(value);
                    updatePreferences(value, omitSeafoods, omitDairy);
                  }}
                  trackColor={{false: '#767577', true: '#1b4965'}}
                />
              </View>

              <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>Remove Seafoods:</Text>
                <Switch
                  value={omitSeafoods}
                  onValueChange={value => {
                    setOmitSeafoods(value);
                    updatePreferences(omitMeats, value, omitDairy);
                  }}
                  trackColor={{false: '#767577', true: '#1b4965'}}
                />
              </View>

              <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>Remove Dairy:</Text>
                <Switch
                  value={omitDairy}
                  onValueChange={value => {
                    setOmitDairy(value);
                    updatePreferences(omitMeats, omitSeafoods, value);
                  }}
                  trackColor={{false: '#767577', true: '#1b4965'}}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.pantryButton} onPress={navToPantry}>
              <Text style={styles.pantryButtonText}>Go To Pantry</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.itemsList}>
            <TouchableOpacity
              onPress={() => setShowConsumedItems(!showConsumedItems)}
              style={styles.headerContainer}>
              <Text style={styles.headerText}>Top 5 Consumed Items</Text>
              <AntDesignIcon
                style={styles.headerIcon}
                name={showConsumedItems ? 'caretup' : 'caretdown'}
                size={20}
                color="green"
              />
            </TouchableOpacity>
            {showConsumedItems &&
              consumedItems.slice(0, 5).map(item => (
                <Text key={item._id} style={styles.item}>
                  {item.name} ({item.frequency})
                </Text>
              ))}
          </View>

          <View style={styles.itemsList}>
            <TouchableOpacity
              onPress={() => setShowWastedItems(!showWastedItems)}
              style={styles.headerContainer}>
              <Text style={styles.headerText}>Top 5 Wasted Items</Text>
              <AntDesignIcon
                style={styles.headerIcon}
                name={showWastedItems ? 'caretup' : 'caretdown'}
                size={20}
                color="red"
              />
            </TouchableOpacity>
            {showWastedItems &&
              wastedItems.slice(0, 5).map(item => (
                <Text key={item._id} style={styles.item}>
                  {item.name} ({item.frequency})
                </Text>
              ))}
          </View>

          <View style={{marginTop: 50}}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
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
    </View>
  );
};

export default Account;
