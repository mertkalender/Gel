import React, {useState} from 'react';
import {
  ButtonContainer,
  ButtonText,
  Container,
  Input,
  RegisterBox,
  LoginButton,
  RegisterButton,
  Title,
} from './style';
import {useDispatch} from 'react-redux';
import {setIsLoggedIn} from '../../../store/slices/userSlice';
import {t} from 'i18next';

const PageRegister = ({ navigation } : any) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <Container>
      <RegisterBox>
        <Title>{t('register:title')}</Title>
        <Input onChangeText={setName} placeholder={t('register:name')} />
        <Input onChangeText={setSurname} placeholder={t('register:surname')} />
        <Input onChangeText={setEmail} placeholder={t('register:email')} />
        <Input
          onChangeText={setPassword}
          placeholder={t('login:password')}
          secureTextEntry
          keyboardType='visible-password'
        />
        <Input
          onChangeText={setConfirmPassword}
          placeholder={t('login:passwordConfirm')}
          secureTextEntry
          keyboardType='visible-password'
        />
        <ButtonContainer>
          <RegisterButton>
            <ButtonText>{t('register:register')}</ButtonText>
          </RegisterButton>
          <LoginButton onPress={() => navigation.navigate('Login')}>
            <ButtonText>{t('register:login')}</ButtonText>
          </LoginButton>
        </ButtonContainer>
      </RegisterBox>
    </Container>
  );
};

export default PageRegister;
