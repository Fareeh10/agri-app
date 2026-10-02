// npm install @react-navigation/native @react-navigation/native-stack
// npx expo install react-native-screens react-native-safe-area-context
// npx expo install @expo/vector-icons

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//creates a stack-based navigation system. Think of a stack like a pile of screens:

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// creates a bottom tab-based navigation system. Think of tabs like the tabs in a web browser:

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import CommunityScreen from '../screens/CommunityScreen';
import MarketScreen from '../screens/MarketScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CropsScreen from '../screens/CropsScreen';
import AnimalsScreen from '../screens/AnimalsScreen';

const Stack = createNativeStackNavigator(); //This creates your navigation stack.
//You can think of Stack as an object that gives you two important components: <Stack.Navigator> and <Stack.Screen>

const Tab = createBottomTabNavigator(); //This creates your bottom tab navigation.
//You can think of Tab as an object that gives you two important components: <Tab.Navigator> and <Tab.Screen>

function MainTabs() {
  return (
    <Tab.Navigator
    
      screenOptions={({ route }) => ({ //React Navigation gives us information about the current tab through route.
          headerShown: false,
          tabBarActiveTintColor: 'rgb(53, 170, 71)',
          tabBarInactiveTintColor: 'rgb(0, 0, 0)',
          tabBarStyle: {
            paddingBottom: 8,
            paddingTop: 6,
            height: 65,
          },
          tabBarIcon: ({ focused, color, size }) => {
            console.log('route.name:', route.name);
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Community') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Market') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
            />
          );
        },
      })}
    >

      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Community"
        component={CommunityScreen}
      />

      <Tab.Screen
        name="Market"
        component={MarketScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />

    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash" // tells When the application starts, show the screen whose name is "Splash".
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          name="Main"
          component={MainTabs}
        />

        <Stack.Screen
          name="Crops"
          component={CropsScreen}
        />

        <Stack.Screen
          name="Animals"
          component={AnimalsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default function AppNavigator() {

//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Splash" // tells When the application starts, show the screen whose name is "Splash".
//         screenOptions={{
//           headerShown: false, // hides the header bar at the top of the screen
//         }}
//       >
//         <Stack.Screen
//           name="Splash"
//           component={SplashScreen}
//         />

//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }