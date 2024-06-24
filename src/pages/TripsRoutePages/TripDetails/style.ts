import styled from 'styled-components/native';
import {fontSizes} from '../../../constants/fonts';
import {colors} from '../../../constants/colors';

interface ButtonProps {
  disabled: boolean;
}

interface InfoTextProps {
  bold?: boolean;
  color?: string
}

export const Container = styled.View`
  flex: 1;
  margin-horizontal: 4%;
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
  flex: 1;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 5%;
`;

export const DestinationText = styled.Text`
  font-size: ${fontSizes.extraLarge}px;
  color: ${colors.orange};
  font-weight: bold;
`;

export const InfoContainer = styled.View`
  margin-vertical: 5%;
  height: auto;
  width: 100%;
  justify-content: center;
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

export const StyledButton = styled.TouchableOpacity<ButtonProps>`
  background-color: ${props =>
    props.disabled ? colors.lightGray : colors.orange};
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  flex: 1;
  max-height: 20%;
  justify-content: center;
  margin-bottom: 10px;
`;

export const ButtonText = styled.Text`
  color: ${colors.white};
  font-size: ${fontSizes.large}px;
`;

export const ArrowImage = styled.Image`
  width: 50%;
  height: 50%;
`;
