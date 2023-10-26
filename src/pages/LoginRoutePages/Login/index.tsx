import React, { useState } from 'react';
import { ButtonContainer, ButtonText, Container, Input, LoginBox, LoginButton, RegisterButton, Title } from './style';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn, setUser } from '../../../store/slices/userSlice';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { getUser } from '../../../utils/firestore';
import { useTranslation } from 'react-i18next';


const PageLogin = ({ navigation } : any) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  const validateInputs = () => {
    if (!email || !password) {
      Alert.alert(t('login:sthWrong'), t('login:emptyFields'));
      return false;
    }
    return true;
  }

  const handleLogin = async () => {
    if (!validateInputs()) {
      return;
    }
    await auth().signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        const userInfo = await getUser(res.user.uid);
        dispatch(setUser({id: res.user.uid, ...userInfo}));
        dispatch(setIsLoggedIn(true));
        Toast.show({
          type: 'success',
          text1: t('login:success'),
          text2: t('login:successMessage'),
          position: 'bottom',
        });
      })
      .catch((error) => {
        console.log('error:', error);
        switch (error.code) {
          case 'auth/invalid-email':
            Alert.alert(t('login:sthWrong'), t('login:invalidEmail'));
            break;
          case 'auth/user-disabled':
            Alert.alert(t('login:sthWrong'), t('login:userDisabled'));
            break;
          case 'auth/user-not-found':
            Alert.alert(t('login:sthWrong'), t('login:userNotFound'));
            break;
          case 'auth/invalid-login':
            Alert.alert(t('login:sthWrong'), t('login:invalidCredentials'));
            break;
          default:
            Alert.alert(t('login:sthWrong'), t('login:unknownError'));
            break;
        }
        return Promise.reject(error);
      });
  }

  return (
      <Container>
        <LoginBox>
        <Title>{t('login:title')}</Title>
          <Input keyboardType='email-address' onChangeText={setEmail} placeholder={t('login:email')} />
          <Input textContentType='password' onChangeText={setPassword} placeholder={t('login:password')} secureTextEntry />
          <ButtonContainer>
            <LoginButton onPress={handleLogin}>
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