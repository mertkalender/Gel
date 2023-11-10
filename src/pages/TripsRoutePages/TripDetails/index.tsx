import React, {useEffect} from 'react';
import {
  ArrowImage,
  ButtonText,
  Container,
  DestinationRow,
  DestinationText,
  InfoLabel,
  InfoRow,
  StyledButton,
} from './style';
import {useTranslation} from 'react-i18next';
import {Trip} from '../../../types/trip';
import {createAttendanceRequest, getUser} from '../../../utils/firestore';
import {User} from '../../../types/user';
import {
  AttendanceRequest,
  AttendanceStatus,
} from '../../../types/attendanceRequest';
import {useAppSelector} from '../../../store/store';
import Toast from 'react-native-toast-message';
import {Alert} from 'react-native';
import { isAlreadyRequested } from '../../../utils/functions';

export const PageTripDetails = ({route, navigation}: any) => {
  const trip: Trip = route.params.trip;
  const [user, setUser] = React.useState<User>();

  const userData = useAppSelector(state => state.user.userData);
  const isOwnTrip = userData.id === trip.creator;
  const fetchUser = async () => {
    setUser(await getUser(trip.creator));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const _handleOnPress = async () => {
    const tempAttendanceRequest: AttendanceRequest = {
      requesterID: userData.id,
      status: AttendanceStatus.PENDING,
    };
    await createAttendanceRequest(trip.id as string, tempAttendanceRequest)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: t('trips:success'),
          text2: t('trips:requestSentSuccess'),
          position: 'bottom',
        });
        navigation.goBack();
      })
      .catch(error => {
        console.log(error);
        Alert.alert(t('generic:sthWrong'), t('generic:unknownError'));
      });
  };

  const {t} = useTranslation();
  return (
    <Container>
      <DestinationRow>
        <DestinationText>{trip.startPoint}</DestinationText>
        <ArrowImage
          resizeMode="contain"
          source={require('../../../assets/images/arrow-vertical.png')}
        />
        <DestinationText>{trip.endPoint}</DestinationText>
      </DestinationRow>
      <InfoRow>
        <InfoLabel>{t(`trips:creator`)}</InfoLabel>
        <InfoLabel>
          {user?.name} {user?.surname}
        </InfoLabel>
      </InfoRow>
      <InfoRow>
        <InfoLabel>{t(`trips:date`)}</InfoLabel>
        <InfoLabel>{new Date(trip.date.toDate()).toDateString()}</InfoLabel>
      </InfoRow>
      {trip.isCreatorDriver ? (
        <InfoRow>
          <InfoLabel>{t(`trips:passengerCount`)}</InfoLabel>
          <InfoLabel>{trip.passengerCount}</InfoLabel>
        </InfoRow>
      ) : (
        <></>
      )}
      {!isOwnTrip ? (
        <StyledButton disabled={isAlreadyRequested(trip.attendanceRequests, userData.id)} onPress={_handleOnPress}>
          <ButtonText >
            {trip.isCreatorDriver ? 'Request to Attend' : 'Invite to your car'}
          </ButtonText>
        </StyledButton>
      ) : (
        <></>
      )}
    </Container>
  );
};
