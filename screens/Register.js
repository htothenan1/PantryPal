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
      const userCreds = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userEmail = userCreds.user.email;
      const userId = userCreds.user.uid;

      console.log('Registered successfully with:', userEmail);

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

      const fetchResponse = await fetch(`${API_URL}/users/data?uid=${userId}`);
      if (!fetchResponse.ok) {
        throw new Error(`Failed to fetch user data: ${fetchResponse.status}`);
      }

      const userData = await fetchResponse.json();
      console.log('Fetched user data:', userData);
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
    </KeyboardAvoidingView>
  );
};

export default Register;
