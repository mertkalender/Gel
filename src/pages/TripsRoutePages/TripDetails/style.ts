import styled from 'styled-components/native';
import {fontSizes} from '../../../constants/fonts';
import {colors} from '../../../constants/colors';

interface ButtonProps {
  disabled: boolean;
}

interface DestinationTextProps {
  color: string;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
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
  flex: 1;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 5%;
`;

export const DestinationText = styled.Text<DestinationTextProps>`
  font-size: ${fontSizes.extraLarge}px;
  color: ${props => props.color};
  font-weight: bold;
`;

export const InfoContainer = styled.View`
  background-color: ${colors.gray};
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  padding: 5%;
  width: 100%;
  flex: 1;
  justify-content: center;
`;

export const InfoRow = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 5%;
  margin-bottom: 5%;
`;

export const InfoLabel = styled.Text`
  font-size: ${fontSizes.medium}px;
  font-weight: bold;
  color: ${colors.white};
`;

export const StyledButton = styled.TouchableOpacity<ButtonProps>`
  background-color: ${props =>
    props.disabled ? colors.darkGray : colors.primary};
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
