import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';
import { fontSizes } from '../../../constants/fonts';

export const Container = styled.View`
    flex: 1;
    background-color: ${colors.background};
    padding: 5%;
    justify-content: flex-start;
`;

export const DestinationRow = styled.View`
    flex: 1;
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
    justify-content: center;
    background-color: ${colors.gray};
    border-radius: 10px;
    padding: 5%;
    margin-bottom: 5%;
`;

export const Divider = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.lightGray};
  width: 100%;
  margin-vertical: 3%;
`;