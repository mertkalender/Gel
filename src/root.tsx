import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import {HomeRoutes} from './routes/HomeRoutes';
import {ProfileRoutes} from './routes/ProfileRoutes';
import {LoginRoutes} from './routes/LoginRoutes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from './store/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from './constants/colors';
import { fontSizes } from './constants/fonts';
import { tabbarHeight } from './constants/generic';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function Root() {
  const Tab = createBottomTabNavigator();
  const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);

  return (
    <NavigationContainer>
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        {!isLoggedIn ? (
          <LoginRoutes />
        ) : (
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarStyle: { height: tabbarHeight },
              headerShown: false,
              tabBarActiveBackgroundColor: '#000000',
              tabBarIcon: ({focused, color, size}) => {
                let iconName = '';
                switch (route.name) {
                  case 'Home':
                    iconName = focused ? 'home' : 'home-outline';
                    break;
                  case 'Profile':
                    iconName = focused ? 'person' : 'person-outline';
                    break;
                }
                return <Ionicons name={iconName} size={fontSizes.tabbarIcons} color={color} />;
              },
              tabBarActiveTintColor: colors.tabBarActiveColor,
              tabBarInactiveTintColor: colors.tabBarInactiveColor,    
            })}
            initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeRoutes} />
            <Tab.Screen name="Profile" component={ProfileRoutes} />
          </Tab.Navigator>
        )}
      </KeyboardAwareScrollView>
    </NavigationContainer>
  );
}
