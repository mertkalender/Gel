import React, {useEffect} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {getTripByCreator} from '../../../utils/firestore';
import {TripListItem} from '../../../components/atom/TriplistItem';
import {useAppSelector} from '../../../store/store';
import {colors} from '../../../constants/colors';
import { Trip } from '../../../types/trip';

const PageMyTrips = ({navigation}: any) => {
  const [trips, setTrips] = React.useState<Trip[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const userData = useAppSelector(state => state.user.userData);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchData().then(() => {
        setRefreshing(false);
      });
    }, 1000);
  }, []);

  const fetchData = async () => {
    try {
      const tempTrips = await getTripByCreator(userData.id);
      setTrips(tempTrips);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          tintColor={colors.white}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      {trips?.map((trip, index) => (
        <TripListItem
          key={index}
          trip={trip}
          onPress={() => navigation.navigate('MyTripDetails', {trip: trip})}
        />
      ))}
    </ScrollView>
  );
};

export default PageMyTrips;
