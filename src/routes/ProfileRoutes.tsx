import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PageProfile from '../pages/ProfileRoutePages/Profile';
import PageSettings from '../pages/ProfileRoutePages/Settings';
import PageMyTrips from '../pages/ProfileRoutePages/MyTrips';
import PageMyTripDetails from '../pages/ProfileRoutePages/MyTripDetails';
import PageEditTrips from '../pages/ProfileRoutePages/EditTrip';
import {View} from 'react-native';
import {colors} from '../constants/colors';
import PageMyInfo from '../pages/ProfileRoutePages/MyInfo';

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
          header(props) {
            return <></>;
          },
        }}
        name="Profile"
        component={PageProfile}
      />
      <ProfileStack.Screen name="MyInfo" component={PageMyInfo} />
      <ProfileStack.Screen name="Settings" component={PageSettings} />
      <ProfileStack.Screen name="MyTrips" component={PageMyTrips} />
      <ProfileStack.Screen name="MyTripDetails" component={PageMyTripDetails} />
      <ProfileStack.Screen name="EditTrip" component={PageEditTrips} />
    </ProfileStack.Navigator>
  );
}
