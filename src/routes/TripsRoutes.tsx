import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageTrips from '../pages/TripsRoutePages/Trips';
import { PageTripDetails } from '../pages/TripsRoutePages/TripDetails';

const TripsStack = createNativeStackNavigator();

export function TripsRoutes() {
    return (
      <TripsStack.Navigator>
        <TripsStack.Screen name="Trips" component={PageTrips} />
        <TripsStack.Screen name="TripDetails" component={PageTripDetails} />
      </TripsStack.Navigator>
    );
  }
  