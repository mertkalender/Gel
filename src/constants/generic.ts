import { Dimensions } from 'react-native';
import {t} from 'i18next'

export const limitScreenSize = 650;
export const screenHeight = Dimensions.get('screen').height;
export const screenWidth = Dimensions.get('screen').width;

export const tabbarHeight = screenHeight > limitScreenSize ? 50 : 40;
export const profileImageSize = screenHeight > limitScreenSize ? 80 : 60;


export const profileMenu = [
    {
        title: t('profile:myInfo'),
        navigationPage: 'Settings'
    },
    {
        title: t('profile:myTrips'),
        navigationPage: 'Settings'
    },
    {
        title: t('profile:settings'),
        navigationPage: 'Settings'
    },
]