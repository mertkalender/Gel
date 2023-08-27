import { colors } from "../../../constants/colors";
import styled from 'styled-components/native';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { fontSizes } from "../../../constants/fonts";

export const HomeContainer = styled(View)`
    flex: 1;
    background-color: ${colors.background};
    padding: 5%;
    justify-content: center
`;

export const ButtonContainer = styled(View)`
    justify-content: space-between;
    height: 30%;
`;

export const HomeButton = styled(TouchableOpacity)`
    background-color: #ffffff;
    margin-top: 5%;
    border-radius: 30px;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const HomeButtonText = styled(Text)`
    color: #000000;
    font-size: ${fontSizes.homeButtons}px;
    font-weight: bold;
    text-align: center;
`;