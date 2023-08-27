import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageHome from '../pages/HomeRoutePages/Home';

const HomeStack = createNativeStackNavigator();

export function HomeRoutes() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={PageHome} />
      </HomeStack.Navigator>
    );
  }
  