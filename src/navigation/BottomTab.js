//import liraries
import React from 'react';
import {View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import CameraScreen from '../screens/CameraScreen';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import PhotoScreen from '../screens/PhotoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../global/colors';
import CreateProjectScreen from '../screens/CreateProjectScreen';
import UserProfile from '../components/UserProfile';

const Tab = createBottomTabNavigator();

const BottomTab = ({route}) => {
  console.log(route?.params?.initialRouteName);
  const initialRouteName = route?.params?.initialRouteName;

  console.log(initialRouteName);
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        tabBarShowLabel: false,
        activeTintColor: 'red',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <Feather name="home" color={focused ? 'black' : 'grey'} size={25} />
          ),
        }}
      />

      <Tab.Screen
        name="PhotoScreen"
        component={PhotoScreen}
        options={{
          headerShown: false,

          tabBarIcon: ({color, size, focused}) => (
            <Feather
              name="image"
              color={focused ? 'black' : 'grey'}
              size={25}
            />
          ),
        }}
      />

      <Tab.Screen
        name="CameraScreen"
        // component={CameraScreen}
        component={CreateProjectScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                backgroundColor: colors.red,
                borderRadius: 20,
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Feather name="camera" color="white" size={25} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <Feather name="bell" color={focused ? 'black' : 'grey'} size={25} />
          ),
        }}
      />

      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        // component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <Feather name="user" color={focused ? 'black' : 'grey'} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// define your styles

//make this component available to the app
export default BottomTab;
