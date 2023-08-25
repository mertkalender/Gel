import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { HomeRoutes } from './src/routes/HomeRoutes';
import { ProfileRoutes } from './src/routes/ProfileRoutes';
import { LoginRoutes } from './src/routes/LoginRoutes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function App() {

  const Tab = createBottomTabNavigator();
  const [isLogin, setIsLogin] = useState(false);

  return (
    <NavigationContainer>
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
      {isLogin ? <LoginRoutes /> : 
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveBackgroundColor: '#000000' }} initialRouteName='Home'>
        <Tab.Screen name="Home" component={HomeRoutes} />
        <Tab.Screen name="Profile" component={ProfileRoutes} />
      </Tab.Navigator>
      }
      </KeyboardAwareScrollView>
    </NavigationContainer>
  );
 }