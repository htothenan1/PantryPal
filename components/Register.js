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
import chefsHat from '../assets/chefs_hat.png';
import styles from './styles/register';
import {auth} from '../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const API_URL = 'https://flavr-413021.ue.r.appspot.com/';

  const handleNavtoLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCreds => {
        const userEmail = userCreds.user.email;
        console.log('Registered successfully with:', userEmail);

        // API call to register the user in your MongoDB database
        return fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: userEmail, firstName: name}),
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to register user in the database.');
        }
        return response.json();
      })
      .then(userData => {
        console.log('MongoDB User created:', userData);
      })
      .catch(error => {
        // console.error(error);
        let errorMessage;

        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage =
              'The email address is already in use by another account.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'The email address is badly formatted.';
            break;
          case 'auth/weak-password':
            errorMessage =
              'The password is too weak. Please enter a stronger password.';
            break;
          default:
            errorMessage =
              error.message ||
              'An unknown error occurred. Please try again later.';
        }

        Alert.alert('Registration Error', errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Image source={chefsHat} style={styles.smileLogo} />
        <Text style={styles.titleText}>Sign up for an account!</Text>
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
