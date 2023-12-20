import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import MultiSelectScreen from './components/MultiSelect';
import ItemDetails from './components/ItemDetails';
import RecipeDetails from './components/RecipeDetails';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Register"
            component={Register}
          />
          <Stack.Screen
            options={{headerShown: true, headerTitle: 'Dashboard'}}
            name="Dashboard"
            component={Dashboard}
          />
          <Stack.Screen
            options={{headerShown: true, headerTitle: 'MultiSelect'}}
            name="MultiSelect"
            component={MultiSelectScreen}
          />
          <Stack.Screen
            options={{headerShown: true, headerTitle: 'Item Details'}}
            name="ItemDetails"
            component={ItemDetails}
          />
          <Stack.Screen
            options={{headerShown: true, headerTitle: 'Recipe Details'}}
            name="RecipeDetails"
            component={RecipeDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
