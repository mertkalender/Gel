import React, {useEffect} from 'react';
import {
  ArrowImage,
  AttendanceRequestsContainer,
  Container,
  DestinationRow,
  DestinationText,
  Divider,
  InfoLabel,
  InfoRow,
} from './style';
import {useTranslation} from 'react-i18next';
import {Trip} from '../../../types/trip';
import {getUsers} from '../../../utils/firestore';
import {User} from '../../../types/user';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const PageMyTripDetails = ({route}: any) => {
  const {t} = useTranslation();
  const trip: Trip = route.params.trip;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: `${t(`trips:details`)}`},
    {key: 'second', title: `${trip.isCreatorDriver ? t(`trips:requests`)+` (${trip.attendanceRequests?.length})` : t(`trips:invitations`)+` (${trip.invitations?.length})`}`},
  ]);

  const [requesters, setRequesters] = React.useState<User[]>([]);

  const fetchRequesters = async () => {
    let requesterIDs: string[] = [];
    if(trip.isCreatorDriver) {
      requesterIDs = trip.attendanceRequests?.map(
        request => request.requesterID,
      ) as string[];
    }
    else {
      requesterIDs = trip.invitations?.map(
        invitation => invitation.inviterID,
      ) as string[];
    }
    const tempResponse = await getUsers(requesterIDs as string[]);
    setRequesters(tempResponse);
  };

  useEffect(() => {
    fetchRequesters();
  }, []);

  const DetailsTab = () => {
    return (
      <>
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
          </>
        ) : (
          <></>
        )}
      </>
    );
  };

  const RequestsTab = () => {
    return (
      <AttendanceRequestsContainer style={{alignItems: requesters.length === 0 ? 'center' : 'flex-start', justifyContent: requesters.length === 0 ? 'center' : 'flex-start'}}>
        {requesters.length === 0 ? (
          <InfoLabel>{t(`generic:noDataFound`)}</InfoLabel>
        ) : (
          <></>
        )}
        {requesters?.map((requester, index) => (
          <InfoLabel key={index}>
            {requester.name} {requester.surname}
          </InfoLabel>
        ))}
      </AttendanceRequestsContainer>
    );
  };

  const _renderScene = SceneMap({
    first: DetailsTab,
    second: RequestsTab,
  });

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
      <TabView
        renderTabBar={props => (
          <TabBar style={{backgroundColor: 'transparent'}} {...props} />
        )}
        style={{flex: 2, height: 100}}
        navigationState={{index, routes}}
        renderScene={_renderScene}
        onIndexChange={setIndex}
      />
    </Container>
  );
};

export default PageMyTripDetails;
