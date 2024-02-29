import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {getTrips} from '../../../utils/firestore';
import {TripListItem} from '../../../components/atom/TriplistItem';
import {useAppSelector} from '../../../store/store';
import { useDispatch } from 'react-redux';

const PageTrips = ({navigation}: any) => {

  const dispatch = useDispatch();
  const tripsData = useAppSelector((state) => state.trips.trips);

  const fetchData = async () => {
    try {
      await getTrips(dispatch);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView>
      {tripsData?.map((trip, index) => (
        <TripListItem
          key={index}
          trip={trip}
          onPress={() => navigation.navigate('TripDetails', {tripId: trip.id})}
        />
      ))}
    </ScrollView>
  );
};

export default PageTrips;
