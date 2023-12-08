import {TouchableOpacity} from 'react-native';
import {
  HomeButtonText,
  HomeContainer,
  BackgroundImage,
} from './style';
import {useTranslation} from 'react-i18next';
import { colors } from '../../../constants/colors';

const PageHome = ({navigation}: any) => {
  const {t} = useTranslation();

  return (
    <HomeContainer>
      <TouchableOpacity
        style={{flex: 1, width: '100%'}}
        onPress={() => {
          navigation.navigate('CreateTrip', {isDriver: true});
        }}>
        <BackgroundImage
          style={{justifyContent: 'flex-end'}}
          resizeMode='cover'
          source={require('../../../assets/images/driver_home.png')}>
          <HomeButtonText style={{color: colors.white}}>{t('home:iAmDriver')}</HomeButtonText>
        </BackgroundImage>
      </TouchableOpacity>
      <TouchableOpacity
        style={{flex: 1, width: '100%'}}
        onPress={() => {
          navigation.navigate('CreateTrip', {isDriver: false});
        }}>
        <BackgroundImage
          style={{justifyContent: 'flex-start'}}
          resizeMode='cover'
          source={require('../../../assets/images/hitchhiker.png')}>
          <HomeButtonText>{t('home:iAmHitchhiker')}</HomeButtonText>
        </BackgroundImage>
      </TouchableOpacity>
    </HomeContainer>
  );
};

export default PageHome;
