import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TextInput, Modal} from 'react-native';
import {colors} from '../../constants/colors';
import {GenericButton} from '../atom/GenericButton';
import Toast from 'react-native-toast-message';
import {sendVerificationEmail} from '../../utils/firestore';
import { TouchableOpacity } from 'react-native';
import { verificationEmailTimeLimit } from '../../constants/generic';

interface VerificationPopupProps {
  isVisible: boolean;
  email: string;
  name: string;
  onClose: () => void;
  onSubmit: () => void;
  setVisible: (isVisible: boolean) => void;
  setLoading: (isLoading: boolean) => void;
}

const VerificationPopup: React.FC<VerificationPopupProps> = ({
  isVisible,
  email,
  name,
  onClose,
  onSubmit,
  setVisible,
  setLoading,
}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(verificationEmailTimeLimit);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const inputRefs = useRef<Array<TextInput | null>>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const {t} = useTranslation();

  useEffect(() => {
    if (isTimerActive) {
      const interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
      if (timer === 0) {
        setIsTimerActive(false);
        setTimer(verificationEmailTimeLimit);
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  }, [isTimerActive, timer]);

  const renderDigitInput = (index: number) => (
    <TextInput
      key={index}
      style={{
        width: 40,
        height: 40,
        color: colors.blue,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.blue,
        textAlign: 'center',
        margin: 5,
      }}
      placeholderTextColor={colors.gray}
      keyboardType="numeric"
      maxLength={1}
      value={code[index] || ''}
      onChangeText={text => handleInputChange(index, text)}
      ref={ref => (inputRefs.current[index] = ref)}
      onSubmitEditing={() => handleInputFocus(index + 1)}
    />
  );

  const handleInputFocus = (index: number) => {
    // Ensure the index is within bounds
    if (index >= 0 && index <= 5 && inputRefs.current[index]) {
      inputRefs.current[index]?.focus();
    }
  };

  const handleInputChange = (index: number, text: string) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text !== '' && index < 5) {
      // Move focus to the next input if a digit is entered
      handleInputFocus(index + 1);
    }
    if (text === '' && index > 0) {
      // Move focus to the previous input if a digit is deleted
      handleInputFocus(index - 1);
    }

    if (index === 5 && newCode.join('') === verificationCode) {
      setVisible(false);
      // if the code is correct, submit
      setLoading(true);
      onSubmit();
    }
  };

  const handleSubmit = () => {
    if (code.join('') === verificationCode) {
      setVisible(false);
      // if the code is correct, submit
      setLoading(true);
      onSubmit();
    } else {
      Toast.show({
        type: 'error',
        text1: t('register:verificationError'),
        text2: '',
        position: 'bottom',
        visibilityTime: 1600,
      });
    }
  };

  const handleOnShow = () => {
    inputRefs.current[0]?.focus();
    sendVerification();
  };

  const sendVerification = () => {
    // create a 6 digit random number for verification
    const tempCode = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(tempCode);
    sendVerificationEmail(email, tempCode, name).then(() => {
      setVisible(true);
      setIsTimerActive(true);
      setTimer(verificationEmailTimeLimit);
    });
  }

  return (
    <Modal
      onShow={handleOnShow}
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            backgroundColor: colors.background,
            padding: 20,
            borderRadius: 10,
            elevation: 5,
          }}>
          <Text style={{color: colors.black}}>
            {t('register:verificationText')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'center',
            }}>
            {[...Array(6)].map((_, index) => renderDigitInput(index))}
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'stretch',
              paddingHorizontal: 10,
            }}>
            <GenericButton
              buttonStyle={{
                backgroundColor: colors.orange,
                marginVertical: 10,
              }}
              textStyle={{color: colors.white}}
              text={t('generic:submit')}
              onPress={handleSubmit}
            />
            {/* add resend button with timer on it */}
            <TouchableOpacity disabled={isTimerActive} onPress={sendVerification}>
              <Text style={{color: isTimerActive ? colors.gray : colors.blue, textAlign: 'center'}}>
                {t('register:resendVerification')} {isTimerActive && timer.toString()}
              </Text>
            </TouchableOpacity>
            <GenericButton
              buttonStyle={{
                backgroundColor: 'transparent',
                width: '30%',
                alignSelf: 'center',
              }}
              textStyle={{color: colors.red}}
              text={t('generic:cancel')}
              onPress={onClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default VerificationPopup;
