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
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
  Text,
} from 'react-native';
import {createTrip} from '../../../utils/firestore';
import {Timestamp, Trip, TripStatus} from '../../../types/trip';
import Toast from 'react-native-toast-message';
import {useAppSelector} from '../../../store/store';
import {colors} from '../../../constants/colors';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { firebase } from '@react-native-firebase/firestore';

const PageCreateTrip = ({route, navigation}: any) => {
  const {t} = useTranslation();
  const [date, setDate] = useState(new Date());
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [passengerCount, setPassengerCount] = useState(0);
  const {isDriver} = route.params;
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const userData = useAppSelector(state => state.user.userData);
  const [location, setLocation] = useState({latitude: 0, longitude: 0});
  const [startLocation, setStartLocation] = useState({latitude: 0, longitude: 0});
  const [endLocation, setEndLocation] = useState({latitude: 0, longitude: 0});

  const validateInputs = () => {
    if (!isDateSelected) {
      Alert.alert(t('createTrip:sthWrong'), t('createTrip:emptyFields'));
      return false;
    }
    return true;
  };

  const handlePassengerCountInputChange = (value: string) => {
    const parsedQty = Number.parseInt(value);
    if (parsedQty > 10 || parsedQty < 1) {
      Toast.show({
        type: 'error',
        text1: t('createTrip:passengerCountError'),
        text2: '',
        position: 'bottom',
        visibilityTime: 1600,
      });
      setDisabled(true);
    } else {
      setDisabled(false);
      setPassengerCount(parsedQty);
    }
  };

  const handleCreateTrip = async () => {
    setLoading(true);
    if (!validateInputs()) {
      setLoading(false);
      return;
    }
    const tempTripDriver: Trip = {
      creator: userData.id,
      startPoint: from,
      endPoint: to,
      startLocation: new firebase.firestore.GeoPoint(
        startLocation.latitude,
        startLocation.longitude,
      ),
      endLocation: new firebase.firestore.GeoPoint(
        endLocation.latitude,
        endLocation.longitude,
      ),
      date: Timestamp.fromDate(date),
      passengerCount: passengerCount,
      passengers: [],
      isCreatorDriver: isDriver,
      attendanceRequests: [],
      status: TripStatus.PENDING,
    };
    const tempTripHitchhiker: Trip = {
      creator: userData.id,
      startPoint: from,
      endPoint: to,
      startLocation: new firebase.firestore.GeoPoint(
        startLocation.latitude,
        startLocation.longitude,
      ),
      endLocation: new firebase.firestore.GeoPoint(
        endLocation.latitude,
        endLocation.longitude,
      ),
      date: Timestamp.fromDate(date),
      passengerCount: passengerCount,
      passengers: [],
      isCreatorDriver: isDriver,
      invitations: [],
      status: TripStatus.PENDING,
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
        setLoading(false);
        console.log('error:', error);
        Alert.alert(t('createTrip:sthWrong'), t('createTrip:unknownError'));
        return Promise.reject(error);
      });
    setLoading(false);
  };
  // call Request location permission function on page render if location is not granted
  useEffect(() => {
    requestLocationPermission().then(() => {
      // get longitude and latitude
      Geolocation.getCurrentPosition(info => {
        setLocation({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
        setStartLocation({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
        setEndLocation({
          latitude: info.coords.latitude + 0.01,
          longitude: info.coords.longitude + 0.01,
        });
      });
    });
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: t('createTrip:locationPermissionTitle'),
            message: t('createTrip:locationPermissionMessage'),
            buttonNeutral: t('createTrip:askMeLater'),
            buttonNegative: t('createTrip:cancel'),
            buttonPositive: t('createTrip:ok'),
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  return (
    <Container>
      {location.latitude === 0 && location.longitude === 0 ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 2, width: '100%', height: '100%'}}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: startLocation.latitude,
              longitude: startLocation.longitude,
            }}
            title={t('createTrip:from')}
            description={t('createTrip:fromDescription')}
            pinColor={colors.orange}
            draggable
            onDragEnd={e => {
              setStartLocation({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
            }}
          />
          <Marker
            coordinate={{
              latitude: endLocation.latitude,
              longitude: endLocation.longitude,
            }}
            title={t('createTrip:to')}
            description={t('createTrip:toDescription')}
            pinColor={colors.blue}
            draggable
            onDragEnd={e => {
              setEndLocation({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
            }}
          />
        </MapView>
      )}

      <FormContainer>
        <DatePickerContainer onPress={() => setShowDatePicker(true)}>
          <Text style={{color: isDateSelected ? colors.black : colors.gray}}>
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
        <CreateButton disabled={disabled} onPress={handleCreateTrip}>
          <ButtonText>{t('createTrip:create')}</ButtonText>
          {loading && (
            <ActivityIndicator
              style={{marginLeft: 10}}
              size="small"
              color={colors.white}
            />
          )}
        </CreateButton>
      </FormContainer>
    </Container>
  );
};

export default PageCreateTrip;
