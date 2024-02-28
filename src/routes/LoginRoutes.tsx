import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PageLogin from '../pages/LoginRoutePages/Login';
import PageRegister from '../pages/LoginRoutePages/Register';
import { View } from 'react-native';
import { colors } from '../constants/colors';

const LoginStack = createNativeStackNavigator();

export function LoginRoutes() {
  return (
    <LoginStack.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
      })}>
      <LoginStack.Screen name="Login" component={PageLogin} />
      <LoginStack.Screen name="Register" component={PageRegister} />
    </LoginStack.Navigator>
  );
}
