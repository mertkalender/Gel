import {colors} from '../../../constants/colors';
import styled from 'styled-components/native';
import {TouchableOpacity, View} from 'react-native';
import {screenWidth} from '../../../constants/generic';
import { fontSizes } from '../../../constants/fonts';

interface CreateButtonProps {
  disabled: boolean;
}

export const Container = styled(View)`
  flex: 1;
  padding: 4%;
`;

export const FormContainer = styled(View)`
  height: auto;
  margin-top: 20px;
  justify-content: space-around;
`;

export const Input = styled.TextInput`
  background-color: #fff;
  color: ${colors.black};
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  height: 50px;
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

export const CreateButton = styled(TouchableOpacity)<CreateButtonProps>`
  flex-direction: row;
  background-color: ${props =>
    props.disabled ? colors.darkGray : colors.orange};
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  height: 50px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: ${fontSizes.medium}px;
`;
