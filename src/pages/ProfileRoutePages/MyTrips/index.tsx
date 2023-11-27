import React, {useEffect} from 'react';
import {FlatList, ScrollView} from 'react-native';
import {getTrips} from '../../../utils/firestore';
import {TripListItem} from '../../../components/atom/TriplistItem';
import {useAppSelector} from '../../../store/store';
import {colors} from '../../../constants/colors';
import {Trip} from '../../../types/trip';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useTranslation} from 'react-i18next';
import { useDispatch } from 'react-redux';

const PageMyTrips = ({navigation}: any) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [myTrips, setMyTrips] = React.useState<Trip[]>([]);
  const [guestTrips, setGuestTrips] = React.useState<Trip[]>([]);
  const tripsData = useAppSelector(state => state.trips.trips);

  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([
    {key: 'first', title: `${t(`trips:own`)}`},
    {key: 'second', title: `${t(`trips:guest`)}`},
  ]);

  const userData = useAppSelector(state => state.user.userData);

  const fetchData = async () => {
    try {
      await getTrips(dispatch)
      const tempTrips = tripsData.filter(trip => trip.creator === userData.id);
      setMyTrips(tempTrips);
      const tempGuestTrips = tripsData.filter(trip =>
        trip.attendanceRequests?.some(
          request =>
            request.requesterID === userData.id &&
            request.status === 'accepted',
        ),
      );
      setGuestTrips(tempGuestTrips);
      setRoutes(routes)
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const OwnTrips = () => (
    <FlatList
      data={myTrips}
      keyExtractor={item => item.id as string}
      renderItem={({item}) => (
        <TripListItem
          trip={item}
          onPress={() => navigation.navigate('MyTripDetails', {trip: item})}
        />
      )}
    />
    // <ScrollView>
    //   {myTrips?.map((trip, index) => (
    //     <TripListItem
    //       key={index}
    //       trip={trip}
    //       onPress={() => navigation.navigate('MyTripDetails', {trip: trip})}
    //     />
    //   ))}
    // </ScrollView>
  );

  const GuestTrips = () => (
    <FlatList
    data={guestTrips}
    keyExtractor={item => item.id as string}
    renderItem={({item}) => (
      <TripListItem
        trip={item}
        onPress={() => navigation.navigate('MyTripDetails', {trip: item})}
      />
    )}
  />
    // <ScrollView>
    //   {guestTrips?.map((trip, index) => (
    //     <TripListItem
    //       key={index}
    //       trip={trip}
    //       onPress={() => navigation.navigate('MyTripDetails', {trip: trip})}
    //     />
    //   ))}
    // </ScrollView>
  );

  const _renderScene = SceneMap({
    first: OwnTrips,
    second: GuestTrips,
  });

  return (
    <TabView
      renderTabBar={props => (
        <TabBar
          indicatorStyle={{
            backgroundColor: '#BEBEBE',
            width: '45%',
            marginLeft: 10,
          }}
          labelStyle={{fontWeight: 'bold'}}
          activeColor={colors.white}
          inactiveColor={'#BEBEBE'}
          style={{backgroundColor: 'transparent'}}
          {...props}
        />
      )}
      style={{flex: 6, height: 100}}
      navigationState={{index, routes}}
      renderScene={_renderScene}
      onIndexChange={setIndex}
    />
  );
};

export default PageMyTrips;
