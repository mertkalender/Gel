import { ButtonContainer, HomeButton, HomeButtonText, HomeContainer } from './style';
import { useTranslation } from 'react-i18next';


const PageHome = ({ navigation } : any) => {

  const { t } = useTranslation();

  return (
    <HomeContainer>
      <ButtonContainer>
        <HomeButton onPress={() => {navigation.navigate('CreateTrip', {isDriver: true})}}>
          <HomeButtonText>{t('home:iAmDriver')}</HomeButtonText>
        </HomeButton>
        <HomeButton onPress={() => {navigation.navigate('CreateTrip', {isDriver: false})}}>
          <HomeButtonText>{t('home:iAmHitchhiker')}</HomeButtonText>
        </HomeButton>
      </ButtonContainer>
    </HomeContainer>
  );
};

export default PageHome;
