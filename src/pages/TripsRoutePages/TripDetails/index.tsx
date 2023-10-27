import React, { useEffect } from 'react';
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
import { getUser } from '../../../utils/firestore';
import { User } from '../../../types/user';

export const PageTripDetails = ({route, navigation}: any) => {
const trip: Trip = route.params.trip;
const [user, setUser] = React.useState<User>()

const fetchUser = async () => {
    setUser(await getUser(trip.creator));
};

useEffect(() => {
    fetchUser();
}, []);

const _handleOnPress = () => {
    
}

const {t} = useTranslation();
console.log(trip);
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
        <InfoLabel>{user?.name} {user?.surname}</InfoLabel>
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
      <StyledButton>
        <ButtonText>
          {trip.isCreatorDriver ? 'Request to Attend' : 'Invite to your car'}
        </ButtonText>
      </StyledButton>
    </Container>
  );
};
