import styled from 'styled-components/native';
import { limitScreenSize, registerBoxHeight, screenHeight, screenWidth } from '../../../constants/generic';
import { fontSizes } from '../../../constants/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: #1a1a1a;
  justify-content: center;
  align-items: center;
`;

export const RegisterBox = styled.View`
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  width: ${screenWidth * 0.9}px;
  height: ${registerBoxHeight}px;
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
  background-color: #555;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const RegisterButton = styled.TouchableOpacity`
  background-color: #007bff;
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
