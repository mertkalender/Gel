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
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { createUser } from '../../../utils/firestore';
import { useTranslation } from 'react-i18next';

const PageRegister = ({ navigation } : any) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { t } = useTranslation();

  const validateInputs = () => {
    if (!name || !surname || !email || !password || !confirmPassword) {
      Alert.alert(t('register:sthWrong'), t('register:emptyFields'));
      return false;
    }
    else if (password !== confirmPassword) {
      Alert.alert(t('register:sthWrong'), t('register:passwordsNotMatch'));
      return false;
    }
    else if (!email.includes('@') || !email.split('@')[1].includes('.')) {
      Alert.alert(t('register:sthWrong'), t('register:invalidEmail'));
      return false;
    }
    return true;
  }

  const handleRegister = () => {
    if (!validateInputs()) {
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        createUser(res.user.uid, name, surname, email);
        Toast.show({
          type: 'success',
          text1: t('register:success'),
          text2: t('register:successMessage'),
          position: 'bottom',
        });
        navigation.navigate('Login');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            Alert.alert(t('register:sthWrong'), t('register:invalidEmail'));
            break;
          case 'auth/email-already-in-use':
            Alert.alert(t('register:sthWrong'), t('register:emailAlreadyInUse'));
            break;
          case 'auth/weak-password':
            Alert.alert(t('register:sthWrong'), t('register:weakPassword'));
            break;
          default:
            console.log(error);
            Alert.alert(t('register:sthWrong'), t('register:unknownError'));
        }
        return Promise.reject(error);
      });
  }

  return (
    <Container>
      <RegisterBox>
        <Title>{t('register:title')}</Title>
        <Input onChangeText={(val) => setName(val.trim())} placeholder={t('register:name')} />
        <Input onChangeText={(val) => setSurname(val.trim())} placeholder={t('register:surname')} />
        <Input keyboardType='email-address' autoCapitalize='none' onChangeText={(val) => setEmail(val.trim())} placeholder={t('register:email')} />
        <Input
          onChangeText={setPassword}
          placeholder={t('register:password')}
          secureTextEntry
          textContentType='newPassword'
        />
        <Input
          onChangeText={setConfirmPassword}
          placeholder={t('register:passwordConfirm')}
          secureTextEntry
          textContentType='newPassword'
        />
        <ButtonContainer>
          <RegisterButton onPress={handleRegister}>
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
