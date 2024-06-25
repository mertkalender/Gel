import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';

export const limitScreenSize = 700;
export const screenHeight = Dimensions.get('screen').height;
export const screenWidth = Dimensions.get('screen').width;
export const profileImageSize = screenHeight > limitScreenSize ? 100 : 70;
export const loginBoxHeight = screenHeight > limitScreenSize ? screenHeight * 0.45 : screenHeight * 0.6
export const registerBoxHeight =screenHeight > limitScreenSize ? screenHeight * 0.6 : screenHeight * 0.8
export const triplistBoxHeight = screenHeight > limitScreenSize ? screenHeight * 0.12 : screenHeight * 0.13
export const profileListItemHeight = screenHeight > limitScreenSize ? screenHeight * 0.08 : screenHeight * 0.09
export const passengerImageSize = screenHeight > limitScreenSize ? 40 : 30;
export const verificationEmailTimeLimit = 90;
export const getProfileMenu = () => {
    const { t } = useTranslation();
  
    return [
      {
        leftIconName: 'person',
        title: t('profile:myInfo'),
        navigationPage: 'MyInfo',
      },
      {
        leftIconName: 'car',
        title: t('profile:myTrips'),
        navigationPage: 'MyTrips',
      },
      {
        leftIconName: 'settings',
        title: t('profile:settings'),
        navigationPage: 'Settings',
      },
      {
        leftIconName: 'log-out',
        title: t('profile:logout'),
        navigationPage: null,
      },
    ];
};
export const IstanbulDistricts = [
    'Adalar',
    'Arnavutköy',
    'Ataşehir',
    'Avcılar',
    'Bağcılar',
    'Bahçelievler',
    'Bakırköy',
    'Başakşehir',
    'Bayrampaşa',
    'Beşiktaş',
    'Beykoz',
    'Beylikdüzü',
    'Beyoğlu',
    'Büyükçekmece',
    'Çatalca',
    'Çekmeköy',
    'Esenler',
    'Esenyurt',
    'Eyüpsultan',
    'Fatih',
    'Gaziosmanpaşa',
    'Güngören',
    'Kadıköy',
    'Kağıthane',
    'Kartal',
    'Küçükçekmece',
    'Maltepe',
    'Pendik',
    'Sancaktepe',
    'Sarıyer',
    'Silivri',
    'Sultanbeyli',
    'Sultangazi',
    'Şile',
    'Şişli',
    'Tuzla',
    'Ümraniye',
    'Üsküdar',
    'Zeytinburnu',
  ];