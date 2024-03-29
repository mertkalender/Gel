import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PageProfile from '../pages/ProfileRoutePages/Profile';
import PageSettings from '../pages/ProfileRoutePages/Settings';
import PageMyTrips from '../pages/ProfileRoutePages/MyTrips';
import PageMyTripDetails from '../pages/ProfileRoutePages/MyTripDetails';
import {View} from 'react-native';
import {colors} from '../constants/colors';

const ProfileStack = createNativeStackNavigator();

export function ProfileRoutes() {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={({route}) => ({
        headerBackground() {
          return (
            <View
              style={{
                backgroundColor: colors.background,
                flex: 1,
              }}
            />
          );
        },
      })}>
      <ProfileStack.Screen
        options={{
          headerTitle: '',
          headerBackground() {
            return (
              <View
                style={{
                  backgroundColor: colors.blue,
                  flex: 1,
                }}
              />
            );
          },
        }}
        name="Profile"
        component={PageProfile}
      />
      <ProfileStack.Screen name="Settings" component={PageSettings} />
      <ProfileStack.Screen name="MyTrips" component={PageMyTrips} />
      <ProfileStack.Screen name="MyTripDetails" component={PageMyTripDetails} />
    </ProfileStack.Navigator>
  );
}
