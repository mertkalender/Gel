import React, {useEffect} from 'react';
import {
  ArrowImage,
  BackgroundImage,
  ButtonText,
  Container,
  DestinationRow,
  DestinationText,
  InfoContainer,
  InfoLabel,
  InfoRow,
  StyledButton,
} from './style';
import {useTranslation} from 'react-i18next';
import {Trip} from '../../../types/trip';
import {
  createAttendanceRequest,
  createInvitation,
  getUser,
} from '../../../utils/firestore';
import {User} from '../../../types/user';
import {
  AttendanceRequest,
  Invitation,
  RequestStatus,
} from '../../../types/trip';
import {useAppSelector} from '../../../store/store';
import Toast from 'react-native-toast-message';
import {Alert, View} from 'react-native';
import {isAlreadyRequested} from '../../../utils/functions';
import {colors} from '../../../constants/colors';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {fontSizes} from '../../../constants/fonts';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/Ionicons';

export const PageTripDetails = ({route, navigation}: any) => {
  const tripId = route.params.tripId;
  const [user, setUser] = React.useState<User>();
  const userData = useAppSelector(state => state.user.userData);
  const tripsData = useAppSelector(state => state.trips.trips);
  const trip = tripsData.find(trip => trip.id === tripId) as Trip;
  const currentDate = new Date(trip.date.toDate());
  const isOwnTrip = userData.id === trip.creator;

  const fetchUser = async () => {
    setUser(await getUser(trip.creator));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const _handleOnPress = async () => {
    if (trip.isCreatorDriver) {
      const tempAttendanceRequest: AttendanceRequest = {
        requesterID: userData.id,
        status: RequestStatus.PENDING,
      };
      await createAttendanceRequest(trip.id as string, tempAttendanceRequest)
        .then(() => {
          Toast.show({
            type: 'success',
            text1: t('generic:success'),
            text2: t('trips:requestSentSuccess'),
            position: 'bottom',
          });
          navigation.goBack();
        })
        .catch(error => {
          console.log(error);
          Alert.alert(t('generic:sthWrong'), t('generic:unknownError'));
        });
    } else {
      const tempInvitation: Invitation = {
        inviterID: userData.id,
        status: RequestStatus.PENDING,
      };
      await createInvitation(trip.id as string, tempInvitation)
        .then(() => {
          Toast.show({
            type: 'success',
            text1: t('generic:success'),
            text2: t('trips:invitationSentSuccess'),
            position: 'bottom',
          });
          navigation.goBack();
        })
        .catch(error => {
          console.log(error);
          Alert.alert(t('generic:sthWrong'), t('generic:unknownError'));
        });
    }
  };

  const {t} = useTranslation();
  return (
    <Container>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 2, width: '100%', height: '100%'}}
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
      <InfoContainer>
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
              name="person"
              size={fontSizes.tabbarIcons}
              color={colors.iconColor}
            />
            <InfoLabel>
              {user?.name} {user?.surname}
            </InfoLabel>
          </View>
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
          <InfoRow>
            <InfoLabel color={colors.blue} bold>
              {t(`trips:passengerCount`)}
            </InfoLabel>
            <InfoLabel>{trip.passengerCount}</InfoLabel>
          </InfoRow>
        ) : (
          <></>
        )}
        {!isOwnTrip ? (
          <StyledButton
            disabled={isAlreadyRequested(trip, userData.id)}
            onPress={_handleOnPress}>
            <ButtonText>
              {trip.isCreatorDriver
                ? t('trips:requestToAttend')
                : t('trips:inviteToYourCar')}
            </ButtonText>
          </StyledButton>
        ) : (
          <></>
        )}
      </InfoContainer>
    </Container>
  );
};
