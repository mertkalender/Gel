import styled from 'styled-components/native';
import { loginBoxHeight, limitScreenSize, screenHeight, screenWidth } from '../../../constants/generic';
import { fontSizes } from '../../../constants/fonts';
import { colors } from '../../../constants/colors';

export const Container = styled.View`
  flex: 1;
  background-color: #1a1a1a;
  justify-content: center;
  align-items: center;
`;

export const LoginBox = styled.View`
  background-color: ${colors.gray};
  padding: 20px;
  border-radius: 10px;
  width: ${screenWidth * 0.9}px;
  height: ${loginBoxHeight}px;
  justify-content: space-around;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
`;

export const ButtonContainer = styled.View`
  justify-content: center;
  height: ${screenHeight > limitScreenSize ? screenHeight * 0.12 : screenHeight * 0.15}px;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: ${colors.primary};
  padding: 2%;
  border-radius: 5px;
  align-items: center;
  flex: 1;
  justify-content: center;
  margin-bottom: 10px;
`;

export const RegisterButton = styled.TouchableOpacity`
  background-color: #555;
  padding: 2%;
  border-radius: 5px;
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: ${fontSizes.medium}px;
`;
