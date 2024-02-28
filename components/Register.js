import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
        return fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: userEmail, firstName: name}),
        });
      })
      .then(response => response.json())
      .then(userData => {
        console.log('MongoDB User created:', userData);
      })
      .catch(error => console.log(error));
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
