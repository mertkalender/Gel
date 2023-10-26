import { limitScreenSize, screenHeight } from "./generic";

export const fontSizes = {
    small: screenHeight > limitScreenSize ? 16 : 14,
    medium: screenHeight > limitScreenSize ? 18 : 16,
    large: screenHeight > limitScreenSize ? 20 : 18,
    extraLarge: screenHeight > limitScreenSize ? 22 : 20,
    homeButtons: screenHeight > limitScreenSize ? 30 : 22,
    tabbarIcons: screenHeight > limitScreenSize ? 20 : 16,
    passengerIcon: screenHeight > limitScreenSize ? 20 : 15,
};