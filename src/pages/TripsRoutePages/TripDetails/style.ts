import styled from 'styled-components/native';
import { fontSizes } from '../../../constants/fonts';
import { colors } from '../../../constants/colors';

interface ButtonProps {
  disabled: boolean;
}

export const Container = styled.View`
    flex: 1;
    background-color: ${colors.background};
    padding: 5%;
    justify-content: flex-start;
`;

export const DestinationRow = styled.View`
    flex: 8;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 5%;
`;

export const DestinationText = styled.Text`
  font-size: ${fontSizes.extraLarge}px;
  color: ${colors.white};
`;

export const InfoRow = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${colors.gray};
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
  background-color: ${props => props.disabled ? colors.darkGray : colors.primary};
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