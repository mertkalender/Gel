import React, { useState } from 'react';
import { ButtonContainer, ButtonText, Container, Input, LoginBox, LoginButton, RegisterButton, Title } from './style';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn, setUser } from '../../../store/slices/userSlice';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { getUser } from '../../../utils/firestore';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../constants/colors';


const PageLogin = ({ navigation } : any) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation();
  const validateInputs = () => {
    if (!email || !password) {
      Alert.alert(t('login:sthWrong'), t('login:emptyFields'));
      return false;
    }
    return true;
  }

  const handleLogin = async () => {
    setLoading(true);
    if (!validateInputs()) {
      setLoading(false);
      return;
    }
    await auth().signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        const userInfo = await getUser(res.user.uid);
        dispatch(setUser(userInfo));
        dispatch(setIsLoggedIn(true));
      })
      .catch((error) => {
        setLoading(false);
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
    setLoading(false);
  }

  return (
      <Container>
        <LoginBox>
        <Title>{t('login:title')}</Title>
          <Input placeholderTextColor={colors.gray} keyboardType='email-address' autoCapitalize='none' onChangeText={setEmail} placeholder={t('login:email')} />
          <Input placeholderTextColor={colors.gray} textContentType='password' autoCapitalize='none' onChangeText={setPassword} placeholder={t('login:password')} secureTextEntry />
          <ButtonContainer>
            <LoginButton onPress={handleLogin}>
              <ButtonText>{t('login:login')}</ButtonText>
              {loading && <ActivityIndicator style={{marginLeft: 10}} size="small" color={colors.white} />}
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