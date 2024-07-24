import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {IconToolsKitchen2, IconFridge} from '@tabler/icons-react-native';
import Login from './screens/Login';
import Register from './screens/Register';
import Kitchen from './screens/Kitchen';
import MultiSelectScreen from './screens/MultiSelect';
import ItemDetails from './screens/ItemDetails';
import RecipeDetails from './screens/RecipeDetails';
import Account from './screens/Account';
import RecipesDash from './screens/RecipesDash';
import Learn from './screens/Learn';
import ModuleStartScreen from './screens/ModuleStartScreen';
import ModuleScreen from './screens/ModuleScreen';
import OnboardingStartScreen from './screens/OnboardingStartScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import Pantry from './screens/Pantry';
import FavoriteRecipes from './screens/FavoriteRecipes';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {UserProvider} from './contexts/UserContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const DashStack = createNativeStackNavigator();
const ModuleStack = createNativeStackNavigator();

const dashIcon = () => {
  return <IconFridge size={20} color="black" />;
};
const recipesIcon = () => {
  return <IconToolsKitchen2 color={'black'} size={20} />;
};
const accountIcon = () => {
  return <AntDesignIcon name="user" size={20} color="black" />;
};

const learnIcon = () => {
  return <AntDesignIcon name="bulb1" size={20} color="black" />;
};

function DashStackScreen() {
  return (
    <DashStack.Navigator>
      <DashStack.Screen
        options={{
          headerShown: false,
        }}
        name="Kitchen"
        component={Kitchen}
      />
      <DashStack.Screen
        options={{
          headerShown: true,
        }}
        name="MultiSelect"
        component={MultiSelectScreen}
      />
      <DashStack.Screen
        options={{headerShown: true}}
        name="ItemDetails"
        component={ItemDetails}
      />
      <DashStack.Screen
        options={{headerShown: true}}
        name="RecipeDetails"
        component={RecipeDetails}
      />
      <DashStack.Screen
        options={{headerShown: false}}
        name="OnboardingStack"
        component={OnboardingStackScreen}
      />
    </DashStack.Navigator>
  );
}

function ModuleStackScreen() {
  return (
    <ModuleStack.Navigator initialRouteName="ModuleStartScreen">
      <ModuleStack.Screen
        options={{
          headerShown: false,
        }}
        name="ModuleStartScreen"
        component={ModuleStartScreen}
      />
      <ModuleStack.Screen
        options={{
          headerShown: false,
        }}
        name="ModuleScreen"
        component={ModuleScreen}
      />
    </ModuleStack.Navigator>
  );
}

function OnboardingStackScreen() {
  return (
    <ModuleStack.Navigator initialRouteName="ModuleStartScreen">
      <ModuleStack.Screen
        options={{
          headerShown: false,
        }}
        name="OnboardingStartScreen"
        component={OnboardingStartScreen}
      />
      <ModuleStack.Screen
        options={{
          headerShown: false,
        }}
        name="OnboardingScreen"
        component={OnboardingScreen}
      />
    </ModuleStack.Navigator>
  );
}

function LearnStackScreen() {
  return (
    <DashStack.Navigator>
      <DashStack.Screen
        name="Learn"
        component={Learn}
        options={{
          headerShown: false,
        }}
      />
      <DashStack.Screen
        options={{headerShown: true}}
        name="ModuleStack"
        component={ModuleStackScreen}
      />
    </DashStack.Navigator>
  );
}
function AccountStackScreen() {
  return (
    <DashStack.Navigator>
      <DashStack.Screen
        options={{
          headerShown: false,
        }}
        name="MyAccount"
        component={Account}
      />
      <DashStack.Screen
        options={{headerShown: true}}
        name="RecipeDetails"
        component={RecipeDetails}
      />
      <DashStack.Screen
        options={{headerShown: true}}
        name="Pantry"
        component={Pantry}
      />
      <DashStack.Screen
        options={{headerShown: true}}
        name="FavoriteRecipes"
        component={FavoriteRecipes}
      />
    </DashStack.Navigator>
  );
}

function RecipesDashStackScreen() {
  return (
    <DashStack.Navigator>
      <DashStack.Screen
        options={{
          headerShown: false,
        }}
        name="RecipesDash"
        component={RecipesDash}
      />
      <DashStack.Screen
        options={{headerShown: true}}
        name="RecipeDetails"
        component={RecipeDetails}
      />
    </DashStack.Navigator>
  );
}

function MyTabsScreen() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={DashStackScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarLabel: 'Kitchen',

          tabBarIcon: () => dashIcon(),
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={RecipesDashStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Recipes',
          tabBarIcon: () => recipesIcon(),
        }}
      />
      <Tab.Screen
        name="LearnScreen"
        component={LearnStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Learn',
          tabBarIcon: () => learnIcon(),
        }}
      />
      <Tab.Screen
        name="Account"
        options={{
          headerShown: false,
          tabBarLabel: 'Account',
          tabBarIcon: () => accountIcon(),
        }}
        component={AccountStackScreen}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <UserProvider>
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
              component={MyTabsScreen}
              name="My Tabs"
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1,
  },
});
