import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeRoutes} from './routes/HomeRoutes';
import {ProfileRoutes} from './routes/ProfileRoutes';
import {LoginRoutes} from './routes/LoginRoutes';
import {useAppSelector} from './store/store';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from './constants/colors';
import {fontSizes} from './constants/fonts';
import {TripsRoutes} from './routes/TripsRoutes';
import { useTranslation } from 'react-i18next';

const MainTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

export default function Root() {
  const { t } = useTranslation();
  const Tab = createBottomTabNavigator();
  const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);
  
  const _renderIcons = ({focused, color, route}: any) => {
    let iconName = '';
    switch (route.name) {
      case 'HomeRoute':
        iconName = focused ? 'home' : 'home-outline';
        break;
      case 'ProfileRoute':
        iconName = focused ? 'person' : 'person-outline';
        break;
      case 'TripsRoute':
        iconName = focused ? 'car' : 'car-outline';
    }
    return (
      <Icon name={iconName} size={fontSizes.tabbarIcons} color={color} />
    );
  };

  
  return (
    <NavigationContainer theme={MainTheme}>
        {!isLoggedIn ? (
          <LoginRoutes />
        ) : (
          <Tab.Navigator
            screenOptions={({route}) => ({
              headerShown: false,
              tabBarActiveBackgroundColor: colors.blue,
              tabBarIcon: ({focused, color}) => {
                return _renderIcons({focused, color, route});
              },
              tabBarActiveTintColor: colors.tabBarActiveColor,
              tabBarInactiveTintColor: colors.tabBarInactiveColor,
            })}
            initialRouteName="Home">
            <Tab.Screen
              name="HomeRoute"
              component={HomeRoutes}
              options={{title: t('home:title')}}
            />
            <Tab.Screen
              name="TripsRoute"
              component={TripsRoutes}
              options={{title: t('trips:title')}}
            />
            <Tab.Screen
              name="ProfileRoute"
              component={ProfileRoutes}
              options={{title: t('profile:title')}}
            />
          </Tab.Navigator>
        )}
    </NavigationContainer>
  );
}
