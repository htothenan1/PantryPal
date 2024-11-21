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
import YourRecipes from './screens/YourRecipes';
import SortingGame from './screens/SortingGame';
import ImportedRecipeDetails from './screens/ImportedRecipeDetails';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {UserProvider} from './contexts/UserContext';
import ImportRecipes from './screens/ImportRecipes';
import FoodBankSearch from './screens/FoodBankSearch';
import FoodBankDetails from './screens/FoodBankDetails';

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
          headerTitle: '',
        }}
        name="MultiSelect"
        headerTitle=""
        component={MultiSelectScreen}
      />
      <DashStack.Screen
        options={{headerShown: true, headerTitle: ''}}
        name="Item Details"
        component={ItemDetails}
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
        options={{headerShown: true, headerTitle: ''}}
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
        name="Account"
        component={Account}
      />
      <DashStack.Screen
        options={{headerShown: true, headerTitle: ''}}
        name="Recipe Details"
        component={RecipeDetails}
      />
      <DashStack.Screen
        options={{headerShown: true, headerTitle: ''}}
        name="Your Recipes"
        component={YourRecipes}
      />
      <DashStack.Screen
        options={{headerShown: true, headerTitle: ''}}
        name="Import Recipes"
        component={ImportRecipes}
      />
      <DashStack.Screen
        options={{headerShown: true, headerTitle: ''}}
        name="Compost Game"
        component={SortingGame}
      />
      <DashStack.Screen
        options={{headerShown: true}}
        name="Imported Recipe Details"
        component={ImportedRecipeDetails}
      />
      <DashStack.Screen
        options={{headerShown: true}}
        name="Food Bank Search"
        component={FoodBankSearch}
      />
      <DashStack.Screen
        options={{headerShown: true}}
        name="Food Bank Details"
        component={FoodBankDetails}
      />
      <DashStack.Screen
        options={{headerShown: false}}
        name="OnboardingStack"
        component={OnboardingStackScreen}
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
        name="Recipes"
        component={RecipesDash}
      />
      <DashStack.Screen
        options={{headerShown: true, headerTitle: ''}}
        name="Recipe Details"
        component={RecipeDetails}
      />
    </DashStack.Navigator>
  );
}

function MyTabsScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 10, // Padding below the tab bar
          paddingTop: 5, // Optional: Padding above the tab bar
          height: 70, // Adjust height to ensure padding doesn't shrink the icons
        },
        tabBarLabelStyle: {
          paddingBottom: 10, // Padding below the text
          fontSize: 14, // Adjust the font size if needed
        },
      }}>
      <Tab.Screen
        name="Home"
        component={DashStackScreen}
        options={{
          tabBarLabel: 'Kitchen',
          tabBarIcon: () => dashIcon(),
        }}
      />
      <Tab.Screen
        name="Recipes Home"
        component={RecipesDashStackScreen}
        options={{
          tabBarLabel: 'Recipes',
          tabBarIcon: () => recipesIcon(),
        }}
      />
      <Tab.Screen
        name="LearnScreen"
        component={LearnStackScreen}
        options={{
          tabBarLabel: 'Learn',
          tabBarIcon: () => learnIcon(),
        }}
      />
      <Tab.Screen
        name="User Account"
        options={{
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
              options={{headerShown: true}}
              name="Food Bank Search"
              component={FoodBankSearch}
            />
            <DashStack.Screen
              options={{headerShown: true}}
              name="Food Bank Details"
              component={FoodBankDetails}
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
