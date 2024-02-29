import { View} from 'react-native';
import styled from 'styled-components/native';
import {Trip} from '../../types/trip';
import {triplistBoxHeight} from '../../constants/generic';
import {fontSizes} from '../../constants/fonts';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { TouchableOpacity } from 'react-native';
import { capitalize } from '../../utils/functions';

interface TripListItemProps {
  trip: Trip;
  onPress: () => void;
 }

export const TripListItem = ({trip, onPress}: TripListItemProps) => {
  
  const { t } = useTranslation();

  return (
    <TouchableOpacity onPress={onPress}>
      <TriplistContainer resizeMode='cover' source={trip.isCreatorDriver ? require('../../assets/images/driver.png') : require('../../assets/images/hitchhiker.png')}>
        <DirectionRow>
          <TriplistText>{capitalize(trip.startPoint)}</TriplistText>
          <TriplistText>{new Date(trip.date.toDate()).toDateString()}</TriplistText>
        </DirectionRow>
        <TriplistRow>
          <TriplistText>{capitalize(trip.endPoint)}</TriplistText>
        {!trip.isCreatorDriver ? (
          <View style={{flexDirection: 'row'}}>
            <Icon style={{alignSelf: 'center'}} name={'person-outline'} size={fontSizes.passengerIcon} color={colors.white}/>
          </View>
        ) : (
          // render icon in the number of trip.passengerCount
          <View style={{flexDirection: 'row'}}>
            {Array.from(Array(trip.passengerCount), (e, i) => {
              return <Icon key={i} style={{alignSelf: 'center'}} name={'person'} size={fontSizes.passengerIcon} color={colors.white}/>
            })}
          </View>
        )}
        </TriplistRow>
      </TriplistContainer>
    </TouchableOpacity>
  );
};

export const TriplistContainer = styled.ImageBackground`
  flex: 1;
  justify-content: space-between;
  align-items: flex-start;
  margin-horizontal: 10px;
  border-radius: 10px;
  padding-horizontal: 10px;
  margin-vertical: 5px;
  height: ${triplistBoxHeight}px;
  overflow: hidden;
`;

export const TriplistRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  width: 100%;
  align-items: center;
  marginbottom: 5px;
`;

export const DirectionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  width: 100%;
  align-items: center;
  marginbottom: 5px;
`;

export const TriplistLabel = styled.Text`
  font-size: ${fontSizes.extraLarge}px;
  font-weight: bold;
  color: #fff;
`;

export const TriplistText = styled.Text`
  font-size: ${fontSizes.large}px;
  color: #fff;
`;

const ArrowImage = styled.Image`
  width: 40%;
  height: 100%;
`;