import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {getTrips} from '../../../utils/firestore';
import {TripListItem} from '../../../components/atom/TriplistItem';
import {useAppSelector} from '../../../store/store';
import {colors} from '../../../constants/colors';
import {Trip} from '../../../types/trip';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {fontSizes} from '../../../constants/fonts';

const PageMyTrips = ({navigation}: any) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const tripsData = useAppSelector(state => state.trips.trips);

  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([
    {key: 'first', title: `${t(`trips:own`)}`},
    {key: 'second', title: `${t(`trips:guest`)}`},
  ]);

  const userData = useAppSelector(state => state.user.userData);

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

  const OwnTrips = () =>
    tripsData.filter(trip => trip.creator === userData.id).length !== 0 ? (
      <FlatList
        data={tripsData.filter(trip => trip.creator === userData.id)}
        keyExtractor={item => item.id as string}
        renderItem={({item}) => (
          <TripListItem
            trip={item}
            onPress={() =>
              navigation.navigate('MyTripDetails', {tripId: item.id})
            }
          />
        )}
      />
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: fontSizes.medium,
            fontWeight: 'bold',
            color: colors.orange,
          }}>
          {t(`generic:noDataFound`)}
        </Text>
      </View>
    );

  const GuestTrips = () =>
    tripsData.filter(trip =>
      trip.attendanceRequests?.some(
        request =>
          request.requesterID === userData.id && request.status === 'accepted',
      ),
    ).length !== 0 ? (
      <FlatList
        data={tripsData.filter(trip =>
          trip.attendanceRequests?.some(
            request =>
              request.requesterID === userData.id &&
              request.status === 'accepted',
          ),
        )}
        keyExtractor={item => item.id as string}
        renderItem={({item}) => (
          <TripListItem
            trip={item}
            onPress={() =>
              navigation.navigate('MyTripDetails', {tripId: item.id})
            }
          />
        )}
      />
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: fontSizes.medium,
            fontWeight: 'bold',
            color: colors.orange,
          }}>
          {t(`generic:noDataFound`)}
        </Text>
      </View>
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
            backgroundColor: colors.blue,
            width: '45%',
            marginLeft: 10,
          }}
          labelStyle={{fontWeight: 'bold'}}
          activeColor={colors.blue}
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
