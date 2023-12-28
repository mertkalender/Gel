import React, {useEffect} from 'react';
import {
  ArrowImage,
  AttendanceRequestsContainer,
  BackgroundImage,
  ButtonsContainer,
  Container,
  DestinationRow,
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
} from './style';
import {useTranslation} from 'react-i18next';
import {Trip} from '../../../types/trip';
import {
  acceptAttendanceRequest,
  acceptInvitation,
  getUsers,
  rejectAttendanceRequest,
  rejectInvitation,
} from '../../../utils/firestore';
import {User} from '../../../types/user';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {Alert, ScrollView, TouchableOpacity, View} from 'react-native';
import {
  Invitation,
  AttendanceRequest,
  RequestStatus,
} from '../../../types/trip';
import {colors} from '../../../constants/colors';

const PageMyTripDetails = ({route}: any) => {
  const {t} = useTranslation();
  const trip: Trip = route.params.trip;
  const [index, setIndex] = React.useState(0);
  const [passengers, setPassengers] = React.useState<User[]>([]);
  const [filteredRequests] = React.useState<AttendanceRequest[]>(
    trip.attendanceRequests?.filter(
      request => request.status === RequestStatus.PENDING,
    ) as AttendanceRequest[],
  );
  const [filteredInvitations] = React.useState<Invitation[]>(
    trip.invitations?.filter(
      invitation => invitation.status === RequestStatus.PENDING,
    ) as Invitation[],
  );

  const [routes] = React.useState([
    {key: 'first', title: `${t(`trips:details`)}`},
    {
      key: 'second',
      title: `${
        trip.isCreatorDriver
          ? t(`trips:requests`) + ` (${filteredRequests?.length})`
          : t(`trips:invitations`) + ` (${filteredInvitations?.length})`
      }`,
    },
  ]);

  const [requesters, setRequesters] = React.useState<User[]>([]);

  const fetchRequesters = async () => {
    let tempArray: string[] = [];
    if (trip.isCreatorDriver) {
      tempArray = filteredRequests?.map(request => request.requesterID);
    } else {
      tempArray = filteredInvitations?.map(invitation => invitation.inviterID);
    }
    const response = await getUsers(tempArray as string[]);
    setRequesters(response);
  };

  const fetchPassengers = async () => {
    const response = await getUsers(trip.passengers as string[]);
    setPassengers(response);
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
            text: t(`generic:accept`),
            onPress: () => {
              acceptAttendanceRequest(trip, {
                requesterID: requester.id,
                status: RequestStatus.ACCEPTED,
              });
            },
          },
          {
            text: t(`generic:cancel`),
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
            text: t(`generic:accept`),
            onPress: () => {
              acceptInvitation(trip, {
                inviterID: requester.id,
                status: RequestStatus.ACCEPTED,
              });
            },
          },
          {
            text: t(`generic:cancel`),
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
            text: t(`generic:reject`),
            onPress: () => {
              rejectAttendanceRequest(trip, {
                requesterID: requester.id,
                status: RequestStatus.REJECTED,
              });
            },
          },
          {
            text: t(`generic:cancel`),
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
            text: t(`generic:reject`),
            onPress: () => {
              rejectInvitation(trip, {
                inviterID: requester.id,
                status: RequestStatus.REJECTED,
              });
            },
          },
          {
            text: t(`generic:cancel`),
          },
        ],
        {cancelable: false},
      );
    }
  };

  const DetailsTab = () => {
    return (
      <View style={{flex: 1, marginTop: 10}}>
        <InfoRow>
          <InfoLabel bold>{t(`trips:date`)}</InfoLabel>
          <InfoLabel>{new Date(trip.date.toDate()).toDateString()}</InfoLabel>
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
    );
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
              <InfoLabel key={index}>
                {requester.name} {requester.surname}
              </InfoLabel>
            </NameContainer>
            <ButtonsContainer>
              <TouchableOpacity onPress={() => _handleAcceptRequest(requester)}>
                <Icon name="checkmark-circle-outline" size={30} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => _handleRejectRequest(requester)}>
                <Icon name="close-circle-outline" size={30} color="red" />
              </TouchableOpacity>
            </ButtonsContainer>
          </RequestRow>
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
      <TabView
        renderTabBar={props => (
          <TabBar
            indicatorStyle={{
              backgroundColor: colors.gray,
              width: '35%',
              marginLeft: 25,
            }}
            labelStyle={{fontWeight: 'bold'}}
            activeColor={colors.black}
            inactiveColor={colors.gray}
            style={{backgroundColor: 'transparent'}}
            {...props}
          />
        )}
        sceneContainerStyle={{backgroundColor: colors.gray, borderRadius: 30}}
        style={{flex: 6, height: 100}}
        navigationState={{index, routes}}
        renderScene={_renderScene}
        onIndexChange={setIndex}
      />
    </Container>
  );
};

export default PageMyTripDetails;
