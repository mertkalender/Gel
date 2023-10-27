import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageHome from '../pages/HomeRoutePages/Home';
import PageCreateTrip from '../pages/HomeRoutePages/CreateTrip';

const HomeStack = createNativeStackNavigator();

export function HomeRoutes() {
    return (
      <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="Home" component={PageHome} />
        <HomeStack.Screen name="CreateTrip" component={PageCreateTrip} />
      </HomeStack.Navigator>
    );
  }
  