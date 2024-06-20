import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PageTrips from '../pages/TripsRoutePages/Trips';
import {PageTripDetails} from '../pages/TripsRoutePages/TripDetails';
import {View} from 'react-native';
import {colors} from '../constants/colors';

const TripsStack = createNativeStackNavigator();

export function TripsRoutes() {
  return (
    <TripsStack.Navigator
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
      <TripsStack.Screen
        options={{
          header(props) {
            return <></>;
          },
        }}
        name="Trips"
        component={PageTrips}
      />
      <TripsStack.Screen name="TripDetails" component={PageTripDetails} />
    </TripsStack.Navigator>
  );
}
