import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import MultiSelectScreen from './components/MultiSelect';
import ItemDetails from './components/ItemDetails';
import RecipeDetails from './components/RecipeDetails';
import Insights from './components/Insights';
import Account from './components/Account';
import CameraPage from './components/CameraPage';
import RecipesDash from './components/RecipesDash';
import ArticleDetails from './components/ArticleDetails';
import Learn from './components/Learn';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {Image} from 'react-native';
// import logo from './assets/chefs_hat.png';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashStack = createNativeStackNavigator();

function LogoTitle() {
  return <AntDesignIcon name="home" size={30} color="black" />;
  // return null;
}

function InsightsTitle() {
  // return <AntDesignIcon name="barschart" size={30} color="black" />;
  return null;
}

function CameraTitle() {
  return <AntDesignIcon name="camerao" size={30} color="black" />;
  // return null;
}

function MultiSelectTitle() {
  // return <AntDesignIcon name="menuunfold" size={30} color="black" />;
  return null;
}

function AccountTitle() {
  return <AntDesignIcon name="user" size={30} color="black" />;
  // return null;
}

function RecipesDashTitle() {
  return <AntDesignIcon name="search1" size={30} color="black" />;
  // return null;
}
function LearnTitle() {
  return <AntDesignIcon name="bulb1" size={30} color="black" />;
  // return null;
}

function DashStackScreen() {
  return (
    <DashStack.Navigator>
      <DashStack.Screen
        options={{headerTitle: props => <LogoTitle {...props} />}}
        name="Dashboard"
        component={Dashboard}
      />
      <DashStack.Screen
        options={{
          headerShown: true,
          headerTitle: props => <MultiSelectTitle {...props} />,
        }}
        name="MultiSelect"
        component={MultiSelectScreen}
      />
      <DashStack.Screen
        options={{headerShown: true, headerTitle: 'Item Details'}}
        name="ItemDetails"
        component={ItemDetails}
      />
      <DashStack.Screen
        options={{headerShown: true, headerTitle: 'Recipe Details'}}
        name="RecipeDetails"
        component={RecipeDetails}
      />
      <DashStack.Screen
        options={{headerShown: true, headerTitle: 'Article Details'}}
        name="ArticleDetails"
        component={ArticleDetails}
      />
      <DashStack.Screen
        options={{
          headerShown: true,
          headerTitle: props => <CameraTitle {...props} />,
        }}
        name="CameraPage"
        component={CameraPage}
      />
    </DashStack.Navigator>
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
          headerTitle: props => <LearnTitle {...props} />,
        }}
      />
      <DashStack.Screen
        options={{headerShown: true, headerTitle: 'Article Details'}}
        name="ArticleDetails"
        component={ArticleDetails}
      />
    </DashStack.Navigator>
  );
}
function AccountStackScreen() {
  return (
    <DashStack.Navigator>
      <DashStack.Screen
        options={{
          headerShown: true,
          headerTitle: props => <AccountTitle {...props} />,
        }}
        name="MyAccount"
        component={Account}
      />
      <DashStack.Screen
        options={{headerShown: true, headerTitle: 'Recipe Details'}}
        name="RecipeDetails"
        component={RecipeDetails}
      />
    </DashStack.Navigator>
  );
}

function RecipesDashStackScreen() {
  return (
    <DashStack.Navigator>
      <DashStack.Screen
        options={{headerTitle: props => <RecipesDashTitle {...props} />}}
        name="RecipesDash"
        component={RecipesDash}
      />
      <DashStack.Screen
        options={{headerShown: true, headerTitle: 'Recipe Details'}}
        name="RecipeDetails"
        component={RecipeDetails}
      />
    </DashStack.Navigator>
  );
}

const insightsIcon = () => {
  return <AntDesignIcon name="barschart" size={20} color="black" />;
};
const dashIcon = () => {
  return <AntDesignIcon name="home" size={20} color="black" />;
};
const recipesIcon = () => {
  return <AntDesignIcon name="search1" size={20} color="black" />;
};
const accountIcon = () => {
  return <AntDesignIcon name="user" size={20} color="black" />;
};

const learnIcon = () => {
  return <AntDesignIcon name="bulb1" size={20} color="black" />;
};

function MyTabsScreen() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={DashStackScreen}
        options={{
          headerShown: false,
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
          headerShown: true,
          headerTitle: props => <LearnTitle {...props} />,
          tabBarLabel: 'Learn',
          tabBarIcon: () => learnIcon(),
        }}
      />
      {/* <Tab.Screen
        name="Insights"
        options={{
          headerShown: true,
          headerTitle: props => <InsightsTitle {...props} />,
          tabBarLabel: 'Insights',
          tabBarIcon: () => insightsIcon(),
        }}
        component={Insights}
      /> */}
      <Tab.Screen
        name="Account"
        options={{
          headerShown: false,
          headerTitle: props => <AccountTitle {...props} />,
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
            component={MyTabsScreen}
            name="My Tabs"
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
