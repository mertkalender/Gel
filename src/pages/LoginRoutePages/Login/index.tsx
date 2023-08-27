import React, { useState } from 'react';
import { ButtonContainer, ButtonText, Container, Input, LoginBox, LoginButton, RegisterButton, Title } from './style';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../../../store/slices/userSlice';
import { t } from 'i18next';


const PageLogin = ({ navigation } : any) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
      <Container>
        <LoginBox>
        <Title>{t('login:title')}</Title>
          <Input onChangeText={setEmail} placeholder={t('login:email')} />
          <Input onChangeText={setPassword} placeholder={t('login:password')} secureTextEntry />
          <ButtonContainer>
            <LoginButton onPress={() => dispatch(setIsLoggedIn(true))}>
              <ButtonText>{t('login:login')}</ButtonText>
            </LoginButton>
            <RegisterButton onPress={() => navigation.navigate('Register')}>
              <ButtonText>{t('login:register')}</ButtonText>
            </RegisterButton>
          </ButtonContainer>
        </LoginBox>
      </Container>
  );
}

export default PageLogin;