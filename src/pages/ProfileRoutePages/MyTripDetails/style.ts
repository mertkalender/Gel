import styled from 'styled-components/native';
import {colors} from '../../../constants/colors';
import {fontSizes} from '../../../constants/fonts';
import { passengerImageSize } from '../../../constants/generic';

  interface InfoTextProps {
    bold?: boolean;
  }
  

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.gray};
  justify-content: flex-start;
`;

export const BackgroundImage = styled.ImageBackground`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 80%;
`;

export const DestinationRow = styled.View`
  flex: 5;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 5%;
`;

export const DestinationText = styled.Text`
  font-size: ${fontSizes.extraLarge}px;
  color: ${colors.black};
  font-weight: bold;
`;

export const InfoRow = styled.View`
  flex: 1;
  max-height: 40%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 5%;
`;

export const InfoLabel = styled.Text<InfoTextProps>`
  font-size: ${fontSizes.medium}px;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  color: ${colors.white};
`;

export const StyledButton = styled.TouchableOpacity`
  background-color: ${colors.primary};
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  flex: 1;
  justify-content: center;
  margin-bottom: 10px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: ${fontSizes.large}px;
`;

export const ArrowImage = styled.Image`
  width: 50%;
  height: 50%;
`;

export const AttendanceRequestsContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  background-color: ${colors.gray};
  padding: 5%;
  margin-bottom: 5%;
`;

export const RequestRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.gray};
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
  color: ${colors.white};
`;

export const PassengerImage = styled.Image`
  width: ${passengerImageSize}px;
  height: ${passengerImageSize}px;
  border-radius: 20px;
  margin-right: 10px;
`;