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
import {doc, setDoc} from 'firebase/firestore';
import smileLogo from '../assets/smile_logo.png';
import styles from './styles/register';
import {auth, db} from '../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleNavtoLogin = () => {
    navigation.navigate('Login');
  };

  const createUserDb = async (userId, userEmail) => {
    const docRef = doc(db, 'users', userId);
    await setDoc(docRef, {
      id: userId,
      email: userEmail,
      firstName: name,
    });
    console.log('DB successfully created');
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCreds => {
        const userId = userCreds.user.uid;
        const userEmail = userCreds.user.email;
        createUserDb(userId, userEmail);
        console.log('Registered successfully with:', userEmail);
      })
      .catch(error => console.log(error));
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Image source={smileLogo} style={styles.smileLogo} />
        <Text style={styles.titleText}>Sign up for an account!</Text>
        <TextInput
          placeholder="First Name"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
        />
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
