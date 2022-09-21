import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import CompleteSetupScreen from '../screens/CompleteSetupScreen';
import CreateProjectScreen from '../screens/CreateProjectScreen';
import HelpScreen from '../screens/HelpScreen';
import BestPriceScreen from '../screens/BestPriceScreen';
import CartScreen from '../screens/CartScreen';
import BottomTab from './BottomTab';
import ProcessScreen from '../screens/ProcessScreen';
import AssignScreen from '../screens/AssignScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationDetails from '../screens/NotificationDetails';
import TermsOfUse from '../screens/TermsOfUse';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Notifications from '../screens/Notifications';
import EditProfile from '../screens/EditProfile';
import ContactUs from '../screens/ContactUs';

const HomeStack = createNativeStackNavigator();

export default function HomeNavigation() {
  return (
    <HomeStack.Navigator initialRouteName="SplashScreen">
      <HomeStack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="CreateProjectScreen"
        component={CreateProjectScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ProcessScreen"
        component={ProcessScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="BestPriceScreen"
        component={BestPriceScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="AssignScreen"
        component={AssignScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="TermsOfUse"
        component={TermsOfUse}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="NotificationDetails"
        component={NotificationDetails}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="CompleteSetupScreen"
        component={CompleteSetupScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
}
