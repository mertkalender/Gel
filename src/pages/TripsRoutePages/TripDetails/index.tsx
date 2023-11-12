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
import {Alert} from 'react-native';
import {isAlreadyRequested} from '../../../utils/functions';
import { colors } from '../../../constants/colors';

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
    if (trip.isCreatorDriver) {
      const tempAttendanceRequest: AttendanceRequest = {
        requesterID: userData.id,
        status: RequestStatus.PENDING,
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
    } else {
      const tempInvitation: Invitation = {
        inviterID: userData.id,
        status: RequestStatus.PENDING,
      };
      await createInvitation(trip.id as string, tempInvitation)
        .then(() => {
          Toast.show({
            type: 'success',
            text1: t('trips:success'),
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
      <BackgroundImage
        resizeMode="cover"
        source={require('../../../assets/images/road.png')}
      />
      <DestinationRow>
        <DestinationText>{trip.startPoint.toUpperCase()}</DestinationText>
        <ArrowImage
          resizeMode="contain"
          source={require('../../../assets/images/arrow-vertical.png')}
        />
        <DestinationText>{trip.endPoint.toUpperCase()}</DestinationText>
      </DestinationRow>
      <InfoContainer>
        <InfoRow>
          <InfoLabel bold>{t(`trips:creator`)}</InfoLabel>
          <InfoLabel>
            {user?.name} {user?.surname}
          </InfoLabel>
        </InfoRow>
        <InfoRow>
          <InfoLabel bold>{t(`trips:date`)}</InfoLabel>
          <InfoLabel>{new Date(trip.date.toDate()).toDateString()}</InfoLabel>
        </InfoRow>
        {trip.isCreatorDriver ? (
          <InfoRow>
            <InfoLabel bold>{t(`trips:passengerCount`)}</InfoLabel>
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
