import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import { colors } from "../../constants/colors";

interface GenericButtonProps {
    onPress: () => void;
    text: string;
    buttonStyle?: any,
    textStyle?: any,
}

const StyledTouchableOpacity = styled(TouchableOpacity)`
    background-color: ${colors.buttonColor};
    border-radius: 10px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    margin: 10px;
`;

const StyledText = styled(Text)`
    color: ${colors.buttonTextColor};
`;

export const GenericButton = ({  onPress, text, buttonStyle, textStyle }: GenericButtonProps) => {
    return (
        <StyledTouchableOpacity style={buttonStyle? buttonStyle : null} onPress={() => onPress}>
            <StyledText style={textStyle? textStyle : null}>{text}</StyledText>
        </StyledTouchableOpacity>
    );
    }