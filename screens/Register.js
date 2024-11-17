import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {API_URL} from '@env';
import chefsHat from '../assets/chefs_hat.png';
import foodbankicon from '../assets/foodbankicon.png';
import styles from './styles/register';
import {auth} from '../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleNavtoLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = async () => {
    try {
      // Create the user in Firebase
      const userCreds = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userEmail = userCreds.user.email;
      const userId = userCreds.user.uid;

      console.log('Registered successfully with:', userEmail);

      // Save the new user to the backend
      const registerResponse = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: userEmail,
          firstName: name,
          uid: userId,
        }),
      });

      if (!registerResponse.ok) {
        throw new Error('Failed to register user in the database.');
      }

      console.log('User registered in backend.');

      // Fetch user data from the backend
      const fetchResponse = await fetch(`${API_URL}/users/data?uid=${userId}`);
      if (!fetchResponse.ok) {
        throw new Error(`Failed to fetch user data: ${fetchResponse.status}`);
      }

      const userData = await fetchResponse.json();
      console.log('Fetched user data:', userData);

      // Navigate to the next screen and pass user data (optional)
      navigation.replace('My Tabs', {userData});
    } catch (error) {
      console.error('Error during sign-up:', error);
      Alert.alert('Registration Error', error.message || 'Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Image source={foodbankicon} style={styles.smileLogo} />
        <Text style={styles.titleText}>Sign up for FeedLink!</Text>
        <TextInput
          placeholder="First Name"
          placeholderTextColor={'black'}
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email Address"
          placeholderTextColor={'black'}
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={'black'}
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.registerText}>
        Already have an account?{' '}
        <Text onPress={handleNavtoLogin} style={styles.registerHyperlink}>
          Log in here!
        </Text>
      </Text>
      {/* <Text style={styles.registerText}>
        Need emergency food?{' '}
        <Text
          onPress={() => navigation.navigate('Food Bank Search')}
          style={styles.registerHyperlink}
          accessibilityLabel="Food Bank Search"
          accessibilityRole="link">
          Find a food bank here!
        </Text>
      </Text> */}
    </KeyboardAvoidingView>
  );
};

export default Register;
