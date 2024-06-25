import styled from 'styled-components/native';
import {colors} from '../../../constants/colors';
import {fontSizes} from '../../../constants/fonts';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding: 4%;
`;

export const Input = styled.TextInput`
  background-color: #fff;
  color: ${colors.black};
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${colors.lightGray};
  font-size: ${fontSizes.medium}px;
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

export const DatePickerContainer = styled(TouchableOpacity)`
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  justify-content: center;
  margin-bottom: 20px;
  height: 50px;
`;