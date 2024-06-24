import styled from 'styled-components/native';
import {colors} from '../../../constants/colors';

export const StyledHeader = styled.View`
    background-color: ${colors.background};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
`;

export const FilterContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${colors.orange};
  border-radius: 30px;
  margin-horizontal: 10px;
  height: 30px;
`;

export const FilterText = styled.Text`
    color: ${colors.white};
    font-weight: bold;
`;
