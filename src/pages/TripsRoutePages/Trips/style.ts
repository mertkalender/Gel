import styled from 'styled-components/native';
import { fontSizes } from '../../../constants/fonts';
import { triplistBoxHeight } from '../../../constants/generic';
import { colors } from '../../../constants/colors';

export const TriplistContainer = styled.View`
  flex: 1;
  background-color: ${colors.gray};
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  borderBottomWidth: 1px;
  backgroundColor: #fff;
  margin-vertical: 5px;
  borderRadius: 8px;
  elevation: 2;
  height: ${triplistBoxHeight}px;
`;

export const TriplistRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    flex: 1;
    width: 100%;
    align-items: center;
    marginBottom: 5px;
`;

export const TriplistLabel = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #333;
`;

export const TriplistText = styled.Text`
    font-size: 16px;
    color: #666;
`;

export const StyledText = styled.Text`
    color: #fff;
    font-size: ${fontSizes.medium}px;
`;