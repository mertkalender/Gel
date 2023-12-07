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
import {ActivityIndicator, Alert} from 'react-native';
import {createUser} from '../../../utils/firestore';
import {useTranslation} from 'react-i18next';
import {colors} from '../../../constants/colors';
import VerificationPopup from '../../../components/molecule/VerificationPopup';

const PageRegister = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVerificationPopupVisible, setIsVerificationPopupVisible] = useState(false);
  const {t} = useTranslation();

  const validateInputs = () => {
    if (!name || !surname || !email || !password || !confirmPassword) {
      Alert.alert(t('register:sthWrong'), t('register:emptyFields'));
      return false;
    } else if (password !== confirmPassword) {
      Alert.alert(t('register:sthWrong'), t('register:passwordsNotMatch'));
      return false;
    } else if (!email.includes('@') || !email.split('@')[1].includes('.')) {
      Alert.alert(t('register:sthWrong'), t('register:invalidEmail'));
      return false;
    }
    return true;
  };

  const handleVerification = () => {
    if (!validateInputs()) {
      return;
    }
    setIsVerificationPopupVisible(true);
  };

  const handleRegister = () => {

    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        createUser(res.user.uid, name, surname, email);
        Toast.show({
          type: 'success',
          text1: t('register:success'),
          text2: t('register:successMessage'),
          position: 'bottom',
        });
        navigation.navigate('Login');
      })
      .catch(error => {
        setLoading(false);
        switch (error.code) {
          case 'auth/invalid-email':
            Alert.alert(t('register:sthWrong'), t('register:invalidEmail'));
            break;
          case 'auth/email-already-in-use':
            Alert.alert(
              t('register:sthWrong'),
              t('register:emailAlreadyInUse'),
            );
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
  };

  return (
    <Container>
      <VerificationPopup setLoading={setLoading} isVisible={isVerificationPopupVisible} setVisible={setIsVerificationPopupVisible} email={email} name={name} onClose={() => setIsVerificationPopupVisible(false)} onSubmit={handleRegister}/>
      <RegisterBox>
        <Title>{t('register:title')}</Title>
        <Input
          autoComplete='off'
          placeholderTextColor={colors.gray}
          onChangeText={val => setName(val.trim())}
          placeholder={t('register:name')}
        />
        <Input
          autoComplete='off'
          placeholderTextColor={colors.gray}
          onChangeText={val => setSurname(val.trim())}
          placeholder={t('register:surname')}
        />
        <Input
          autoComplete='off'
          placeholderTextColor={colors.gray}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={val => setEmail(val.trim())}
          placeholder={t('register:email')}
        />
        <Input
          autoComplete='off'
          placeholderTextColor={colors.gray}
          onChangeText={setPassword}
          placeholder={t('register:password')}
          secureTextEntry
          autoCapitalize="none"
          textContentType="newPassword"
        />
        <Input
          autoComplete='off'
          placeholderTextColor={colors.gray}
          onChangeText={setConfirmPassword}
          placeholder={t('register:passwordConfirm')}
          secureTextEntry
          autoCapitalize="none"
          textContentType="newPassword"
        />
        <ButtonContainer>
          <RegisterButton onPress={handleVerification}>
            <ButtonText>{t('register:register')}</ButtonText>
            {loading && <ActivityIndicator style={{marginLeft: 10}} size="small" color={colors.white} />}
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
