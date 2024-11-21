import React, {useEffect, useState, useCallback} from 'react';
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
import {signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import {auth} from '../firebase';
import foodbankicon from '../assets/foodbankicon.png';
import styles from './styles/login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigation.replace('My Tabs');
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleNavtoRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  const handleLogin = useCallback(() => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => {
        console.log(error.code, error.message);
        let errorMessage;

        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'The email address is formatted incorrectly.';
            break;
          case 'auth/user-disabled':
            errorMessage =
              'Your account has been disabled. Please contact support.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No user found with this email. Please sign up.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again.';
            break;
          default:
            errorMessage = 'An unknown error occurred. Please try again later.';
        }

        Alert.alert('Login Error', errorMessage);
      });
  }, [email, password]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Image source={foodbankicon} style={styles.smileLogo} />
        <Text style={styles.titleText}>Welcome Back!</Text>
        <TextInput
          placeholder="Email Address"
          placeholderTextColor={'black'}
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          secureTextEntry={false}
          accessibilityLabel="Email Input"
          accessibilityRole="text"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={'black'}
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
          accessibilityLabel="Password Input"
          accessibilityRole="text"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
          accessibilityLabel="Login Button"
          accessibilityRole="button">
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.registerText}>
        Don't have an account yet?{' '}
        <Text
          onPress={handleNavtoRegister}
          style={styles.registerHyperlink}
          accessibilityLabel="Sign Up Link"
          accessibilityRole="link">
          Sign up here!
        </Text>
      </Text>
    </KeyboardAvoidingView>
  );
};

export default Login;
