import styled from 'styled-components/native';
import {colors} from '../../../constants/colors';
import {fontSizes} from '../../../constants/fonts';

export const Container = styled.View`
  flex: 1;
  padding: 4%;
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: ${colors.orange};
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  color: ${colors.white};
  font-size: ${fontSizes.medium}px;
`;

export const StyledTextInput = styled.TextInput`
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  justify-content: center;
  margin-bottom: 20px;
  height: 50px;
`;