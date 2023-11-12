import React, {useEffect} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {getTripByCreator} from '../../../utils/firestore';
import {TripListItem} from '../../../components/atom/TriplistItem';
import {useAppSelector} from '../../../store/store';
import {colors} from '../../../constants/colors';
import {Trip} from '../../../types/trip';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useTranslation} from 'react-i18next';

const PageMyTrips = ({navigation}: any) => {
  const {t} = useTranslation();
  const [trips, setTrips] = React.useState<Trip[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: `${t(`trips:own`)}`},
    {key: 'second', title: `${t(`trips:guest`)}`},
  ]);

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

  const OwnTrips = () => (
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

  const GuestTrips = () => (
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

  const _renderScene = SceneMap({
    first: OwnTrips,
    second: GuestTrips,
  });

  return (
    <TabView
      renderTabBar={props => (
        <TabBar
          indicatorStyle={{
            backgroundColor: colors.lightGray,
            width: '45%',
            marginLeft: 10,
          }}
          labelStyle={{fontWeight: 'bold'}}
          activeColor={colors.white}
          inactiveColor={colors.lightGray}
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
