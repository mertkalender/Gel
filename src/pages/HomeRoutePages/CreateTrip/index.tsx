import DatePicker from 'react-native-date-picker';
import {
  ButtonText,
  Container,
  CreateButton,
  DatePickerContainer,
  FormContainer,
  Input,
} from './style';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import {Alert, Text} from 'react-native';
import {createTrip} from '../../../utils/firestore';
import {Timestamp, Trip, TripStatus} from '../../../types/trip';
import Toast from 'react-native-toast-message';
import {useAppSelector} from '../../../store/store';
import {colors} from '../../../constants/colors';

const PageCreateTrip = ({route, navigation}: any) => {
  const {t} = useTranslation();
  const [date, setDate] = useState(new Date());
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [passengerCount, setPassengerCount] = useState(0);
  const {isDriver} = route.params;

  const userData = useAppSelector(state => state.user.userData);

  const validateInputs = () => {
    if (!from || !to || !isDateSelected) {
      Alert.alert(t('createTrip:sthWrong'), t('createTrip:emptyFields'));
      return false;
    }
    return true;
  };

  const handlePassengerCountInputChange = (value: string) => {
    const parsedQty = Number.parseInt(value);
    if (Number.isNaN(parsedQty)) {
      setPassengerCount(0); //setter for state
    } else if (parsedQty > 10 || parsedQty < 1) {
      Toast.show({
        type: 'error',
        text1: t('createTrip:passengerCountError'),
        text2: '',
        position: 'bottom',
        visibilityTime: 1600,
      });
      setPassengerCount(10);
    } else {
      setPassengerCount(parsedQty);
    }
  };

  const handleCreateTrip = async () => {
    if (!validateInputs()) {
      return;
    }
    const tempTripDriver: Trip = {
      creator: userData.id,
      startPoint: from,
      endPoint: to,
      date: Timestamp.fromDate(date),
      passengerCount: passengerCount,
      isCreatorDriver: isDriver,
      attendanceRequests: [],
      status: TripStatus.ACTIVE,
    };
    const tempTripHitchhiker: Trip = {
      creator: userData.id,
      startPoint: from,
      endPoint: to,
      date: Timestamp.fromDate(date),
      passengerCount: passengerCount,
      isCreatorDriver: isDriver,
      invitations: [],
      status: TripStatus.ACTIVE,
    };
    await createTrip(isDriver ? tempTripDriver : tempTripHitchhiker)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: t('createTrip:success'),
          text2: t('createTrip:successMessage'),
          position: 'bottom',
        });
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log('error:', error);
        Alert.alert(t('createTrip:sthWrong'), t('createTrip:unknownError'));
        return Promise.reject(error);
      });
  };
  return (
    <Container>
      <FormContainer>
        <Input
          placeholderTextColor={colors.gray}
          placeholder={t('createTrip:from')}
          onChangeText={setFrom}
        />
        <Input
          placeholderTextColor={colors.gray}
          placeholder={t('createTrip:to')}
          onChangeText={setTo}
        />
        <DatePickerContainer onPress={() => setShowDatePicker(true)}>
          <Text>
            {isDateSelected ? date.toLocaleString() : t('createTrip:date')}
          </Text>
          <DatePicker
            mode="datetime"
            open={showDatePicker}
            title={t('createTrip:selectDate')}
            date={date}
            onConfirm={date => {
              setDate(date), setIsDateSelected(true), setShowDatePicker(false);
            }}
            onCancel={() => setShowDatePicker(false)}
            minimumDate={new Date()}
            modal
          />
        </DatePickerContainer>
        {isDriver && (
          <Input
            placeholderTextColor={colors.gray}
            keyboardType="numeric"
            placeholder={t('createTrip:passengerCount')}
            onChangeText={val => handlePassengerCountInputChange(val)}
          />
        )}
        <CreateButton onPress={handleCreateTrip}>
          <ButtonText>{t('createTrip:create')}</ButtonText>
        </CreateButton>
      </FormContainer>
    </Container>
  );
};

export default PageCreateTrip;
