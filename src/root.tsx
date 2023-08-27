import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { HomeRoutes } from './routes/HomeRoutes';
import { ProfileRoutes } from './routes/ProfileRoutes';
import { LoginRoutes } from './routes/LoginRoutes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './store/store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default function Root() {

  const Tab = createBottomTabNavigator();
  const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);

  return (
      <NavigationContainer>
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
          {!isLoggedIn ? <LoginRoutes /> : 
          <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveBackgroundColor: '#000000' }} initialRouteName='Home'>
            <Tab.Screen name="Home" component={HomeRoutes} />
            <Tab.Screen name="Profile" component={ProfileRoutes} />
          </Tab.Navigator>
          }
        </KeyboardAwareScrollView>
      </NavigationContainer>
  );
 }