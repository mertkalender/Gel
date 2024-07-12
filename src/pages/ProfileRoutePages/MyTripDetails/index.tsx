import React, {useEffect} from 'react';
import {
  AttendanceRequestsContainer,
  ButtonsContainer,
  Container,
  DestinationText,
  Divider,
  InfoLabel,
  InfoRow,
  LightDivider,
  NameContainer,
  PassengerImage,
  PassengerInfo,
  PassengersWrapper,
  RequestRow,
  RequesterLabel,
} from './style';
import {useTranslation} from 'react-i18next';
import {Trip} from '../../../types/trip';
import {
  acceptAttendanceRequest,
  acceptInvitation,
  deleteTrip,
  getUsers,
  rejectAttendanceRequest,
  rejectInvitation,
} from '../../../utils/firestore';
import {User} from '../../../types/user';
import {SceneMap} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {Alert, ScrollView, TouchableOpacity, View} from 'react-native';
import {RequestStatus} from '../../../types/trip';
import {colors} from '../../../constants/colors';
import {useAppSelector} from '../../../store/store';
import {fontSizes} from '../../../constants/fonts';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {screenHeight} from '../../../constants/generic';
import Toast from 'react-native-toast-message';

const PageMyTripDetails = ({route, navigation}: any) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t(`trips:details`),
      headerRight: () => (
        <>
          <Icon
            name="create"
            size={20}
            color={colors.blue}
            onPress={() => {
              handleEditTrip();
            }}
            style={{marginRight: 10}}
          />
          <Icon
            name="trash"
            size={20}
            color={colors.red}
            onPress={() => {
              handleDeleteTrip();
            }}
          />
        </>
      ),
    });
  }, [navigation]);

  const {t} = useTranslation();
  const tripId: string = route.params.tripId;
  const tripsData = useAppSelector(state => state.trips.trips);
  const trip = tripsData.find(trip => trip.id === tripId) as Trip;
  const currentDate = new Date(trip.date.toDate());
  const [passengers, setPassengers] = React.useState<User[]>([]);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: `${t(`trips:details`)}`},
    {
      key: 'second',
      title: `${
        trip.isCreatorDriver
          ? t(`trips:requests`) +
            ` (${
              trip.attendanceRequests?.filter(
                request => request.status === RequestStatus.PENDING,
              )?.length
            })`
          : t(`trips:invitations`) +
            ` (${
              trip.invitations?.filter(
                invitation => invitation.status === RequestStatus.PENDING,
              )?.length
            })`
      }`,
    },
  ]);

  const [requesters, setRequesters] = React.useState<User[]>([]);

  const fetchRequesters = async () => {
    let tempArray: string[] = [];
    if (trip.isCreatorDriver) {
      tempArray = trip.attendanceRequests
        ?.filter(request => request.status === RequestStatus.PENDING)
        .map(request => request.requesterID) as string[];
    } else {
      tempArray = trip.invitations
        ?.filter(invitation => invitation.status === RequestStatus.PENDING)
        ?.map(invitation => invitation.inviterID) as string[];
    }
    const response = await getUsers(tempArray as string[]);
    setRequesters(response);
  };

  const fetchPassengers = async () => {
    const response = await getUsers(trip.passengers as string[]);
    setPassengers(response);
  };

  const handleDeleteTrip = () => {
    Alert.alert(
      t(`generic:wait`),
      t(`trips:deleteTripMessage`),
      [
        {
          text: t(`generic:cancel`),
        },
        {
          style: 'destructive',
          text: t(`generic:delete`),
          onPress: async () => {
            await navigation.goBack();
            deleteTrip(trip.id as string);
            Toast.show({
              type: 'success',
              text1: t(`generic:success`),
              text2: t(`trips:deleteTripSuccessMessage`),
              visibilityTime: 2000,
              autoHide: true,
              position: 'bottom',
            });
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleEditTrip = () => {
    navigation.navigate('EditTrip', {trip: trip});
  };

  useEffect(() => {
    fetchRequesters();
    fetchPassengers();
  }, []);

  const _handleAcceptRequest = (requester: User) => {
    if (trip.isCreatorDriver) {
      Alert.alert(
        t(`generic:wait`),
        t(`trips:acceptRequestMessage`),
        [
          {
            text: t(`generic:cancel`),
          },
          {
            text: t(`generic:accept`),
            onPress: () => {
              acceptAttendanceRequest(trip, {
                requesterID: requester.id,
                status: RequestStatus.ACCEPTED,
              }).then(() => {
                fetchRequesters();
                fetchPassengers();
              });
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        t(`generic:wait`),
        t(`trips:acceptInvitationMessage`),
        [
          {
            text: t(`generic:cancel`),
          },
          {
            text: t(`generic:accept`),
            onPress: () => {
              acceptInvitation(trip, {
                inviterID: requester.id,
                status: RequestStatus.ACCEPTED,
              }).then(() => {
                fetchRequesters();
                fetchPassengers();
              });
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  const _handleRejectRequest = (requester: User) => {
    if (trip.isCreatorDriver) {
      Alert.alert(
        t(`generic:wait`),
        t(`trips:rejectRequestMessage`),
        [
          {
            text: t(`generic:cancel`),
          },
          {
            text: t(`generic:reject`),
            onPress: () => {
              rejectAttendanceRequest(trip, {
                requesterID: requester.id,
                status: RequestStatus.REJECTED,
              }).then(() => {
                fetchRequesters();
              });
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        t(`generic:wait`),
        t(`trips:rejectInvitationMessage`),
        [
          {
            text: t(`generic:cancel`),
          },
          {
            text: t(`generic:reject`),
            onPress: () => {
              rejectInvitation(trip, {
                inviterID: requester.id,
                status: RequestStatus.REJECTED,
              }).then(() => {
                fetchRequesters();
              });
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  const RequestsTab = () => {
    return (
      <AttendanceRequestsContainer
        style={{
          alignItems: requesters.length === 0 ? 'center' : 'flex-start',
          justifyContent: requesters.length === 0 ? 'center' : 'flex-start',
        }}>
        {requesters.length === 0 ? (
          <InfoLabel>{t(`generic:noDataFound`)}</InfoLabel>
        ) : (
          <></>
        )}
        {requesters?.map((requester, index) => (
          <RequestRow>
            <NameContainer>
              <RequesterLabel key={index}>
                {requester.name} {requester.surname}
              </RequesterLabel>
            </NameContainer>
            <ButtonsContainer>
              <TouchableOpacity onPress={() => _handleAcceptRequest(requester)}>
                <Icon
                  name="checkmark-circle-outline"
                  size={30}
                  color={colors.blue}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => _handleRejectRequest(requester)}>
                <Icon
                  name="close-circle-outline"
                  size={30}
                  color={colors.orange}
                />
              </TouchableOpacity>
            </ButtonsContainer>
          </RequestRow>
        ))}
      </AttendanceRequestsContainer>
    );
  };

  return (
    <Container>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{height: screenHeight * 0.5}}
        initialRegion={{
          latitude:
            Math.abs(trip.startLocation.latitude + trip.endLocation.latitude) /
            2,
          longitude:
            Math.abs(
              trip.startLocation.longitude + trip.endLocation.longitude,
            ) / 2,
          latitudeDelta:
            Math.abs(trip.startLocation.latitude - trip.endLocation.latitude) *
            2,
          longitudeDelta:
            Math.abs(
              trip.startLocation.longitude - trip.endLocation.longitude,
            ) * 2,
        }}>
        <Marker
          coordinate={{
            latitude: trip.startLocation.latitude,
            longitude: trip.startLocation.longitude,
          }}
          title={t('createTrip:from')}
          description={t('createTrip:fromDescription')}
          pinColor={colors.orange}
        />
        <Marker
          coordinate={{
            latitude: trip.endLocation.latitude,
            longitude: trip.endLocation.longitude,
          }}
          title={t('createTrip:to')}
          description={t('createTrip:toDescription')}
          pinColor={colors.blue}
        />
        <MapViewDirections
          origin={trip.startLocation}
          destination={trip.endLocation}
          apikey={ENV.GOOGLE_MAPS_API_KEY}
          timePrecision="now"
          strokeColor={colors.blue}
          strokeWidth={7}
        />
      </MapView>
      <View style={{height: 'auto'}}>
        <InfoRow>
          <DestinationText>{trip.startPoint}</DestinationText>
          <Icon
            name="navigate"
            size={fontSizes.tabbarIcons}
            color={colors.iconColor}
          />
          <DestinationText>{trip.endPoint}</DestinationText>
        </InfoRow>
        <InfoRow>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="calendar"
              size={fontSizes.tabbarIcons}
              color={colors.iconColor}
            />
            <InfoLabel>{currentDate.toDateString()}</InfoLabel>
          </View>
          <InfoLabel>
            {currentDate.getHours().toString().padStart(2, '0')}.
            {currentDate.getMinutes().toString().padStart(2, '0')}
          </InfoLabel>
        </InfoRow>
        {trip.isCreatorDriver ? (
          <>
            <PassengersWrapper>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <InfoLabel bold>{t(`trips:passengers`)}</InfoLabel>
                <InfoLabel>{'(' + trip.passengers?.length + ')'}</InfoLabel>
              </View>
              <Divider />
              <ScrollView>
                {passengers?.map((passenger, index) => (
                  <>
                    <View
                      style={{
                        marginVertical: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <PassengerImage
                        source={require('../../../assets/images/default-avatar.png')}
                      />
                      <PassengerInfo key={index}>
                        {passenger.name} {passenger.surname}
                      </PassengerInfo>
                    </View>
                    {index !== passengers.length - 1 && <LightDivider />}
                  </>
                ))}
              </ScrollView>
            </PassengersWrapper>
          </>
        ) : (
          <></>
        )}
      </View>
    </Container>
  );
};

export default PageMyTripDetails;
