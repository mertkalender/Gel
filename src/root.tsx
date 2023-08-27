import React, {useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
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
import { TripsRoutes } from './routes/TripsRoutes';
import { t } from 'i18next';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const MainTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

export default function Root() {
  const Tab = createBottomTabNavigator();
  const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);

  return (
    <NavigationContainer theme={MainTheme}>
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        {!isLoggedIn ? (
          <LoginRoutes />
        ) : (
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarStyle: { height: tabbarHeight },
              headerShown: false,
              tabBarActiveBackgroundColor: '#000000',
              tabBarIcon: ({focused, color}) => {
                let iconName = '';
                switch (route.name) {
                  case 'HomeRoute':
                    iconName = focused ? 'home' : 'home-outline';
                    break;
                  case 'ProfileRoute':
                    iconName = focused ? 'person' : 'person-outline';
                    break;
                  case "TripsRoute": 
                    iconName = focused ? 'car' : 'car-outline';
                }
                return <Ionicons name={iconName} size={fontSizes.tabbarIcons} color={color} />;
              },
              tabBarActiveTintColor: colors.tabBarActiveColor,
              tabBarInactiveTintColor: colors.tabBarInactiveColor,    
            })}
            initialRouteName="Home">
            <Tab.Screen name="HomeRoute" component={HomeRoutes} options={{title: t('home:title')}}/>
            <Tab.Screen name="TripsRoute" component={TripsRoutes} options={{title: t('trips:title')}}/>
            <Tab.Screen name="ProfileRoute" component={ProfileRoutes} options={{title: t('profile:title')}}/>
          </Tab.Navigator>
        )}
      </KeyboardAwareScrollView>
    </NavigationContainer>
  );
}
