import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDR6pX6fFZR752mJ7EnLMiCkNslsWAcsew',
  authDomain: 'pantrypal-ec17c.firebaseapp.com',
  projectId: 'pantrypal-ec17c',
  storageBucket: 'pantrypal-ec17c.appspot.com',
  messagingSenderId: '23467618581',
  appId: '1:23467618581:web:ec9e2572630306817cf91c',
  measurementId: 'G-0SNN03RX8Q',
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(app);

// Export the auth object to use in your app
export {auth};
