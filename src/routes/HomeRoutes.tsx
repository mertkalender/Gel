import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PageHome from '../pages/HomeRoutePages/Home';
import PageCreateTrip from '../pages/HomeRoutePages/CreateTrip';
import { View } from 'react-native';
import { colors } from '../constants/colors';

const HomeStack = createNativeStackNavigator();

export function HomeRoutes() {
  return (
    <HomeStack.Navigator
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
      <HomeStack.Screen name="Home" component={PageHome} />
      <HomeStack.Screen name="CreateTrip" component={PageCreateTrip} />
    </HomeStack.Navigator>
  );
}
