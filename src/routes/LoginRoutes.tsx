import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageLogin from '../pages/LoginRoutePages/Login';

const LoginStack = createNativeStackNavigator();

export function LoginRoutes() {
    return (
      <LoginStack.Navigator screenOptions={{headerShown: false}}>
        <LoginStack.Screen name="Login" component={PageLogin} />
      </LoginStack.Navigator>
    );
  }
  