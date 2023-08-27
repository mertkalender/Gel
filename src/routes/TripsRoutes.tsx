import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageTrips from '../pages/TripsRoıutePages/Trips';

const TripsStack = createNativeStackNavigator();

export function TripsRoutes() {
    return (
      <TripsStack.Navigator>
        <TripsStack.Screen name="Trips" component={PageTrips} />
      </TripsStack.Navigator>
    );
  }
  