import React, {useEffect} from 'react';
import {
  ArrowImage,
  AttendanceRequestRow,
  AttendanceRequestsContainer,
  Container,
  DestinationRow,
  DestinationText,
  Divider,
  InfoLabel,
  InfoRow,
} from './style';
import {useTranslation} from 'react-i18next';
import { Trip } from '../../../types/trip';
import { getUsers } from '../../../utils/firestore';
import { User } from '../../../types/user';

export const PageMyTripDetails = ({route, navigation}: any) => {
  const trip: Trip = route.params.trip;

  const [requesters, setRequesters] = React.useState<User[]>([]);

  const fetchRequesters = async () => {
    const requesterIDs = trip.attendanceRequests.map((request) => request.requesterID);
    const tempResponse = await getUsers(requesterIDs);
    setRequesters(tempResponse);
  }

  useEffect(() => {
    fetchRequesters();
  }, []);

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
        <InfoLabel>{t(`trips:date`)}</InfoLabel>
        <InfoLabel>{new Date(trip.date.toDate()).toDateString()}</InfoLabel>
      </InfoRow>
      {trip.isCreatorDriver ? (
      <>
        <InfoRow>
          <InfoLabel>{t(`trips:passengerCount`)}</InfoLabel>
          <InfoLabel>{trip.passengerCount}</InfoLabel>
        </InfoRow>
        {trip.attendanceRequests?.length > 0 ? (
        <AttendanceRequestsContainer>
          <InfoLabel>{t(`trips:attendanceRequests`)}</InfoLabel>
          <Divider />
          {requesters?.map((requester, index) => (
            <InfoLabel key={index}>{requester.name} {requester.surname}</InfoLabel>
          ))}
        </AttendanceRequestsContainer>
        ) : (
          <></>
        )
          }

      </>
      ) : (
        <></>
      )}
    </Container>
  );
};
