import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageProfile from '../pages/ProfileRoutePages/Profile';
import PageSettings from '../pages/ProfileRoutePages/Settings';
import PageMyTrips from '../pages/ProfileRoutePages/MyTrips';
import { PageMyTripDetails } from '../pages/ProfileRoutePages/MyTripDetails';

const ProfileStack = createNativeStackNavigator();

export function ProfileRoutes() {
    return (
      <ProfileStack.Navigator initialRouteName='Profile'>
        <ProfileStack.Screen name="Profile" component={PageProfile} />
        <ProfileStack.Screen name="Settings" component={PageSettings} />
        <ProfileStack.Screen name="MyTrips" component={PageMyTrips} />
        <ProfileStack.Screen name="MyTripDetails" component={PageMyTripDetails} />
      </ProfileStack.Navigator>
    );
  }
  