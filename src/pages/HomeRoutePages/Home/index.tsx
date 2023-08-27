import { ButtonContainer, HomeButton, HomeButtonText, HomeContainer } from './style';
import { t } from 'i18next';

const PageHome = ({ navigation } : any) => {
  return (
    <HomeContainer>
      <ButtonContainer>
        <HomeButton onPress={() => navigation.navigate('Profile')}>
          <HomeButtonText>{t('home:iAmDriver')}</HomeButtonText>
        </HomeButton>
        <HomeButton onPress={() => navigation.navigate('Profile')}>
          <HomeButtonText>{t('home:iAmHitchhiker')}</HomeButtonText>
        </HomeButton>
      </ButtonContainer>
    </HomeContainer>
  );
};

export default PageHome;
