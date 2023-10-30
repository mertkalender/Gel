import React, {useEffect} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {getTrips} from '../../../utils/firestore';
import {TripListItem} from '../../../components/atom/TriplistItem';
import {useAppSelector} from '../../../store/store';
import {Trip} from '../../../types/trip';
import { colors } from '../../../constants/colors';
import { useDispatch } from 'react-redux';
import { setTrips } from '../../../store/slices/tripsSlice';

const PageTrips = ({navigation}: any) => {

  const dispatch = useDispatch();
  const tripsData = useAppSelector((state) => state.trips.trips);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchData().then(() => {
        setRefreshing(false);
      })
    }, 1000);
  }, []);

  const fetchData = async () => {
    try {
      const tempTrips = await getTrips();
      dispatch(setTrips(tempTrips));
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
        <RefreshControl tintColor={colors.white} refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {tripsData?.map((trip, index) => (
        <TripListItem
          key={index}
          trip={trip}
          onPress={() => navigation.navigate('TripDetails', {trip: trip})}
        />
      ))}
    </ScrollView>
  );
};

export default PageTrips;
