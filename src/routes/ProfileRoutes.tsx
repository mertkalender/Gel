import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageProfile from '../pages/Profile';

const ProfileStack = createNativeStackNavigator();

export function ProfileRoutes() {
    return (
      <ProfileStack.Navigator initialRouteName='Home'>
        <ProfileStack.Screen name="Home" component={PageProfile} />
      </ProfileStack.Navigator>
    );
  }
  