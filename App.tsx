import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { HomeRoutes } from './src/routes/HomeRoutes';
import { ProfileRoutes } from './src/routes/ProfileRoutes';

export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: true, tabBarActiveBackgroundColor: '#000000' }} initialRouteName='Home'>
        <Tab.Screen name="Home" component={HomeRoutes} />
        <Tab.Screen name="Settings" component={ProfileRoutes} />
      </Tab.Navigator>
    </NavigationContainer>
  );
 }