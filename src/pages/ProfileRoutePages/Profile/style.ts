import styled from 'styled-components/native';
import {
  limitScreenSize,
  profileImageSize,
  screenHeight,
  screenWidth,
} from '../../../constants/generic';
import {fontSizes} from '../../../constants/fonts';
import { colors } from '../../../constants/colors';

export const Container = styled.View`
  flex: 1;
  background-color: #1a1a1a;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
`;

export const ProfileInfo = styled.View`
  background-color: ${colors.gray};
  border-radius: 10px;
  width: ${screenWidth * 0.95}px;
  height: ${screenHeight * 0.18}px;
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

export const ProfileImage = styled.Image`
    width: ${profileImageSize}px;
    height: ${profileImageSize}px;
    border-radius: ${profileImageSize / 2}px;
`;