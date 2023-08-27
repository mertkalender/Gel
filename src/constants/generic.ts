import { Dimensions } from 'react-native';

export const limitScreenSize = 650;
export const screenHeight = Dimensions.get('screen').height;
export const screenWidth = Dimensions.get('screen').width;

export const tabbarHeight = screenHeight > limitScreenSize ? 50 : 40;
