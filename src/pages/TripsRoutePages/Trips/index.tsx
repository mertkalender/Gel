import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {getTrips} from '../../../utils/firestore';
import {TripListItem} from '../../../components/atom/TriplistItem';
import {useAppSelector} from '../../../store/store';
import {useDispatch} from 'react-redux';
import {FilterContainer, FilterText, StyledHeader} from './style';
import {useTranslation} from 'react-i18next';
import {Trip} from '../../../types/trip';
import DropDownPicker from 'react-native-dropdown-picker';
import {colors} from '../../../constants/colors';
import {IstanbulDistricts, screenHeight} from '../../../constants/generic';
import { fontSizes } from '../../../constants/fonts';

const PageTrips = ({navigation}: any) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const tripsData = useAppSelector(state => state.trips.trips);

  const [dateRange, setDateRange] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [isToPickerOpen, setIsToPickerOpen] = useState(false);
  const [isFromPickerOpen, setIsFromPickerOpen] = useState(false);
  const filterItems = [
    {label: 'Allianz', value: 'Allianz'},
    {label: 'Ytu Teknopark', value: 'Ytu Teknopark'},
    ...IstanbulDistricts.map(district => ({label: district, value: district})),
  ];

  const fetchData = async () => {
    try {
      await getTrips(dispatch);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterTrips = (trip: Trip) => {
    if (
      dateRange &&
      (trip.date.toDate() < new Date(dateRange) ||
        trip.date.toDate() > new Date(dateRange))
    ) {
      return false;
    }
    if (
      from.toLowerCase() &&
      trip.startPoint.toLowerCase() !== from.toLowerCase()
    ) {
      return false;
    }
    if (to.toLowerCase() && trip.endPoint.toLowerCase() !== to.toLowerCase()) {
      return false;
    }
    return true;
  };

  const filteredTrips = tripsData?.filter(filterTrips);

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <View>
        <StyledHeader>
          <FilterContainer onPress={() => null}>
            <FilterText>{t('tripList:date')}</FilterText>
          </FilterContainer>
          <FilterContainer
            onPress={() => setIsFromPickerOpen(!isFromPickerOpen)}>
            <DropDownPicker
              open={isFromPickerOpen}
              value={from}
              items={[{label: t('tripList:from'), value: ''}, ...filterItems]}
              setOpen={setIsFromPickerOpen}
              setValue={setFrom}
              style={{
                backgroundColor: 'transparent',
                borderWidth: 0,
              }}
              containerStyle={{
                flexDirection: 'row',
              }}
              dropDownContainerStyle={{
                backgroundColor: colors.background,
                borderWidth: 0,
              }}
              textStyle={{
                color: colors.orange,
              }}
              placeholder={t('tripList:from')}
              placeholderStyle={{fontWeight: 'bold', color: colors.white, textAlign: 'center'}}
              selectedItemLabelStyle={{
                fontWeight: 'bold',
                color: colors.orange,
              }}
              labelStyle={{fontWeight: 'bold', color: colors.white, textAlign: 'center'}}
              showArrowIcon={false}
              labelProps={{numberOfLines: 1, adjustsFontSizeToFit: true}}
            />
          </FilterContainer>
          <FilterContainer onPress={() => setIsToPickerOpen(!isToPickerOpen)}>
            <DropDownPicker
              open={isToPickerOpen}
              value={to}
              items={[{label: t('tripList:to'), value: ''}, ...filterItems]}
              setOpen={setIsToPickerOpen}
              setValue={setTo}
              style={{
                backgroundColor: 'transparent',
                borderWidth: 0,
              }}
              containerStyle={{
                flexDirection: 'row',
              }}
              dropDownContainerStyle={{
                backgroundColor: colors.background,
                borderWidth: 0,
              }}
              textStyle={{
                color: colors.orange,
              }}
              placeholder={t('tripList:to')}
              placeholderStyle={{fontWeight: 'bold', color: colors.white, textAlign: 'center'}}
              selectedItemLabelStyle={{
                fontWeight: 'bold',
                color: colors.orange,
              }}
              labelStyle={{fontWeight: 'bold', color: colors.white, textAlign: 'center'}}
              showArrowIcon={false}
              labelProps={{numberOfLines: 1, adjustsFontSizeToFit: true}}
            />
          </FilterContainer>
        </StyledHeader>
      </View>
      {filteredTrips?.length === 0 ? (
        <View
          style={{
            height: screenHeight * 0.8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: fontSizes.medium,
              fontWeight: 'bold',
              color: colors.orange,
            }}>
            {t(`generic:noDataFound`)}
          </Text>
        </View>
      ) : (
        filteredTrips?.map((trip, index) => (
          <TripListItem
            key={index}
            trip={trip}
            onPress={() =>
              navigation.navigate('TripDetails', {tripId: trip.id})
            }
          />
        ))
      )}
    </ScrollView>
  );
};

export default PageTrips;
