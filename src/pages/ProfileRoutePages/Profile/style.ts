import styled from 'styled-components/native';
import {
  limitScreenSize,
  screenHeight,
  screenWidth,
} from '../../../constants/generic';
import {fontSizes} from '../../../constants/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: #1a1a1a;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
`;

export const ProfileInfo = styled.View`
  background-color: #333;
  border-radius: 10px;
  width: ${screenWidth * 0.95}px;
  flex: 1;
  justify-content: space-around;
`;

export const ListContainer = styled.View`
  background-color: #333;
  margin: 10px;
  border-radius: 10px;
  width: ${screenWidth * 0.95}px;
  flex: 3;
  justify-content: space-around;
`;

export const ButtonContainer = styled.View`
  justify-content: center;
  height: ${screenHeight > limitScreenSize
    ? screenHeight * 0.12
    : screenHeight * 0.15}px;
`;

export const ProfileInfoText = styled.Text`
  color: #fff;
  font-size: ${fontSizes.large}px;
  text-align: center;
`;

export const ProfileImageContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
