import React, {useState} from 'react';
import {Alert, Text} from 'react-native';
import {Timestamp, Trip} from '../../../types/trip';
import {updateTrip} from '../../../utils/firestore';
import {colors} from '../../../constants/colors';
import {ButtonText, Container, DatePickerContainer, SaveButton} from './style';
import {useTranslation} from 'react-i18next';
import DatePicker from 'react-native-date-picker';

const PageEditTrip = ({route, navigation}: any) => {
  const trip: Trip = route.params.trip;

  const {t} = useTranslation();
  const [tripDate, setTripDate] = useState(
    trip.date.toDate() as Date | undefined,
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({title: 'Edit Trip'});
  }, [navigation]);

  const handleSave = async () => {
    try {
      await updateTrip(trip.id as string, {
        date: Timestamp.fromDate(tripDate as Date),
      });
      Alert.alert('Success', 'Trip updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update the trip');
    }
  };

  return (
    <Container>
      <DatePickerContainer onPress={() => setShowDatePicker(true)}>
        <Text style={{color: colors.black}}>{tripDate?.toLocaleString()}</Text>
        <DatePicker
          mode="datetime"
          open={showDatePicker}
          title={t('createTrip:selectDate')}
          date={tripDate as Date}
          onConfirm={date => {
            setTripDate(date), setShowDatePicker(false);
          }}
          onCancel={() => setShowDatePicker(false)}
          minimumDate={new Date()}
          modal
        />
      </DatePickerContainer>
      <SaveButton onPress={handleSave}>
        <ButtonText>{t('generic:save')}</ButtonText>
      </SaveButton>
    </Container>
  );
};

export default PageEditTrip;
