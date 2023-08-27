import { limitScreenSize, screenHeight } from "./generic";

export const fontSizes = {
    small: screenHeight > limitScreenSize ? 12 : 8,
    medium: screenHeight > limitScreenSize ? 14 : 10,
    large: screenHeight > limitScreenSize ? 16 : 12,
    extraLarge: screenHeight > limitScreenSize ? 18 : 14,
    homeButtons: screenHeight > limitScreenSize ? 30 : 22,
    tabbarIcons: screenHeight > limitScreenSize ? 20 : 16,
};