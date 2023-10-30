import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageLogin from '../pages/LoginRoutePages/Login';
import PageRegister from '../pages/LoginRoutePages/Register';

const LoginStack = createNativeStackNavigator();

export function LoginRoutes() {
    return (
      <LoginStack.Navigator>
        <LoginStack.Screen name="Login" component={PageLogin} />
        <LoginStack.Screen name="Register" component={PageRegister} />
      </LoginStack.Navigator>
    );
  }
  