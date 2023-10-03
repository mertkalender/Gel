import {View} from 'react-native';
import styled from 'styled-components/native';
import {Trip} from '../../types/trip';
import {triplistBoxHeight} from '../../constants/generic';
import {fontSizes} from '../../constants/fonts';
import {useTranslation} from 'react-i18next';

export const TripListItem = ({
  creator,
  passengerCount,
  startPoint,
  endPoint,
}: Trip) => {
  
  const { t } = useTranslation();

  return (
    <TriplistContainer>
      <TriplistRow>
        <View style={{flexDirection: 'row'}}>
          <TriplistLabel>{t('trips:creator')}: </TriplistLabel>
          <TriplistText>{creator}</TriplistText>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TriplistLabel>{t('trips:passengerCount')}: </TriplistLabel>
          <TriplistText>{passengerCount}</TriplistText>
        </View>
      </TriplistRow>
      <TriplistRow>
        <View style={{flexDirection: 'row'}}>
          <TriplistText>{startPoint}</TriplistText>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TriplistText>{'--------------->'}</TriplistText>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TriplistText>{endPoint}</TriplistText>
        </View>
      </TriplistRow>
    </TriplistContainer>
  );
};

export const TriplistContainer = styled.View`
  flex: 1;
  background-color: #333;
  justify-content: space-between;
  align-items: flex-start;
  margin-horizontal: 10px;
  border-radius: 10px;
  padding-horizontal: 10px;
  borderbottomwidth: 1px;
  backgroundcolor: #fff;
  margin-vertical: 5px;
  borderradius: 8px;
  elevation: 2;
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

export const TriplistLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

export const TriplistText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const StyledText = styled.Text`
  color: #fff;
  font-size: ${fontSizes.medium}px;
`;
