import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';

export const limitScreenSize = 650;
export const screenHeight = Dimensions.get('screen').height;
export const screenWidth = Dimensions.get('screen').width;

export const tabbarHeight = screenHeight > limitScreenSize ? 50 : 40;
export const profileImageSize = screenHeight > limitScreenSize ? 80 : 60;
export const loginBoxHeight = screenHeight > limitScreenSize ? screenHeight * 0.45 : screenHeight * 0.6
export const createTripBoxHeight = screenHeight > limitScreenSize ? screenHeight * 0.33 : screenHeight * 0.44
export const registerBoxHeight =screenHeight > limitScreenSize ? screenHeight * 0.6 : screenHeight * 0.8
export const triplistBoxHeight = screenHeight > limitScreenSize ? screenHeight * 0.12 : screenHeight * 0.13

export const getProfileMenu = () => {
    const { t } = useTranslation();
  
    return [
      {
        title: t('profile:myInfo'),
        navigationPage: 'Settings',
      },
      {
        title: t('profile:myTrips'),
        navigationPage: 'Settings',
      },
      {
        title: t('profile:settings'),
        navigationPage: 'Settings',
      },
      {
        title: t('profile:logout'),
        navigationPage: null,
      },
    ];
};