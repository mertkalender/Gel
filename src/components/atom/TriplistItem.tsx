import {View} from 'react-native';
import styled from 'styled-components/native';
import {Trip} from '../../types/trip';
import {triplistBoxHeight} from '../../constants/generic';
import {fontSizes} from '../../constants/fonts';
import {useTranslation} from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';

interface TripListItemProps {
  trip: Trip;
  onPress: () => void;
 }

export const TripListItem = ({trip, onPress}: TripListItemProps) => {
  
  const { t } = useTranslation();

  return (
    <TriplistContainer onPress={onPress}>
      <DirectionRow>
        <TriplistText>{trip.startPoint}</TriplistText>
        <TriplistText>{'--------------->'}</TriplistText>
        <TriplistText>{trip.endPoint}</TriplistText>
      </DirectionRow>
      <TriplistRow>
      {!trip.isCreatorDriver ? (
        <View style={{flexDirection: 'row'}}>
          <Ionicons style={{alignSelf: 'center'}} name={'person-outline'} size={fontSizes.passengerIcon} color={colors.white}/>
        </View>
      ) : (
        <View style={{flexDirection: 'row'}}>
          <Ionicons style={{alignSelf: 'center'}} name={'person'} size={fontSizes.passengerIcon} color={colors.white}/>
          <TriplistText> {trip.passengerCount}</TriplistText>
        </View>
      )}
      </TriplistRow>
    </TriplistContainer>
  );
};

export const TriplistContainer = styled.TouchableOpacity`
  flex: 1;
  background-color: ${colors.gray};
  justify-content: space-between;
  align-items: flex-start;
  margin-horizontal: 10px;
  border-radius: 10px;
  padding-horizontal: 10px;
  borderbottomwidth: 1px;
  margin-vertical: 5px;
  borderradius: 8px;
  height: ${triplistBoxHeight}px;
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
  flex: 2;
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
