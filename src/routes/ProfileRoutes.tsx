import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageProfile from '../pages/ProfileRoutePages/Profile';
import PageSettings from '../pages/ProfileRoutePages/Settings';

const ProfileStack = createNativeStackNavigator();

export function ProfileRoutes() {
    return (
      <ProfileStack.Navigator initialRouteName='Profile' screenOptions={{headerShown: false}}>
        <ProfileStack.Screen name="Profile" component={PageProfile} />
        <ProfileStack.Screen name="Settings" component={PageSettings} />
      </ProfileStack.Navigator>
    );
  }
  