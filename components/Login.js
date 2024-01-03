import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import {auth} from '../firebase';
import chefsHat from '../assets/chefs_hat.png';
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

  const handleNavtoRegister = () => {
    navigation.navigate('Register');
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => console.log(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Image source={chefsHat} style={styles.smileLogo} />
        <Text style={styles.titleText}>Welcome Back!</Text>
        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.registerText}>
        Don't have an account yet?{' '}
        <Text onPress={handleNavtoRegister} style={styles.registerHyperlink}>
          Sign up here!
        </Text>
      </Text>
    </KeyboardAvoidingView>
  );
};

export default Login;
