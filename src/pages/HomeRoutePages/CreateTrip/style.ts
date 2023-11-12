import {colors} from '../../../constants/colors';
import styled from 'styled-components/native';
import {TouchableOpacity, View} from 'react-native';
import {createTripBoxHeight, screenWidth} from '../../../constants/generic';
import { fontSizes } from '../../../constants/fonts';

export const Container = styled(View)`
  flex: 1;
  background-color: ${colors.background};
  padding: 5%;
  justify-content: center;
`;

export const FormContainer = styled(View)`
  justify-content: space-around;
  width: ${screenWidth * 0.9}px;
  height: ${createTripBoxHeight}px;
`;

export const Input = styled.TextInput`
  background-color: #fff;
  color: ${colors.black};
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  flex: 1;
  margin-bottom: 20px;
`;

export const DatePickerContainer = styled(TouchableOpacity)`
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  justify-content: center;
  flex: 1;
  margin-bottom: 20px;
`;

export const CreateButton = styled(TouchableOpacity)`
  flex-direction: row;
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
  font-size: ${fontSizes.medium}px;
`;
