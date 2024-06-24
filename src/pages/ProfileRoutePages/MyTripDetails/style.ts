import styled from 'styled-components/native';
import {colors} from '../../../constants/colors';
import {fontSizes} from '../../../constants/fonts';
import {passengerImageSize} from '../../../constants/generic';

interface InfoTextProps {
  bold?: boolean;
}

export const Container = styled.ScrollView`
  flex: 1;
  margin-horizontal: 4%;
`;

export const BackgroundImage = styled.ImageBackground`
  align-self: flex-start;
  width: 100%;
  aspect-ratio: 2.17;
  top: 0;
`;

export const DestinationText = styled.Text`
  font-size: ${fontSizes.extraLarge}px;
  color: ${colors.orange};
  font-weight: bold;
`;

export const InfoRow = styled.View`
  height: 80px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const InfoLabel = styled.Text<InfoTextProps>`
  font-size: ${fontSizes.large}px;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  color: ${colors.orange};
  margin-left: 10px;
`;

export const RequesterLabel = styled.Text`
  font-size: ${fontSizes.medium}px;
  font-weight: bold;
  color: ${colors.blue};
`;

export const ArrowImage = styled.Image`
  width: 50%;
  height: 50%;
`;

export const AttendanceRequestsContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 5%;
  margin-bottom: 5%;
`;

export const RequestRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 5%;
  margin-bottom: 5%;
`;

export const ButtonsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const NameContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: flex-start;
`;

export const Divider = styled.View`
  border-bottom-width: 1px;
  margin-top: 10px;
  border-bottom-color: ${colors.lightGray};
`;

export const LightDivider = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.lightGray};
  margin-horizontal: 10%;
`;

export const PassengersWrapper = styled.View`
  flex: 4;
  justify-content: flex-start;
  padding: 5%;
`;

export const PassengerInfo = styled.Text`
  font-size: ${fontSizes.medium}px;
  color: ${colors.orange};
`;

export const PassengerImage = styled.Image`
  width: ${passengerImageSize}px;
  height: ${passengerImageSize}px;
  border-radius: 20px;
  margin-right: 10px;
`;
