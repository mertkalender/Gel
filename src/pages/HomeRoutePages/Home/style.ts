import { colors } from "../../../constants/colors";
import styled from 'styled-components/native';
import { Button, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { fontSizes } from "../../../constants/fonts";

export const HomeContainer = styled(View)`
    flex: 1;
    background-color: ${colors.background};
    justify-content: center;
    align-items: center;
`;

export const BackgroundImage = styled(ImageBackground)`
    flex: 1;
    align-items: center;
    padding-top: 50px;
    padding-bottom: 50px;
`;

export const HomeButtonText = styled(Text)`
    color: #000000;
    font-size: ${fontSizes.homeButtons}px;
    font-weight: bold;
    text-align: center;
`;