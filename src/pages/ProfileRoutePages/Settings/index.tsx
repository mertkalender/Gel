import React, {useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  SettingsContainer,
  SettingsItemText,
  SettingsRow,
  StyledPicker,
  StyledPickerIOS,
} from './style';
import {Picker} from '@react-native-picker/picker';
import i18next from 'i18next';
import { colors } from '../../../constants/colors';

const PageSettings = () => {
  const selectedLanguageCode = i18next.language;
  const [lang, changeLang] = useState(selectedLanguageCode);
  const {t} = useTranslation();

  const languages = [
    {code: 'en', label: t('language:english')},
    {code: 'tr', label: t('language:turkish')},
  ];
  const handleLanguageChange = (language: string) => {
    changeLang(language);
    i18next.changeLanguage(language);
  };

  return (
    <SettingsContainer>
      <SettingsRow>
        <SettingsItemText>{t('settings:language')}:</SettingsItemText>
        {Platform.OS === 'ios' ? (
          <StyledPickerIOS
            itemStyle={{color: colors.white}}
            selectedValue={lang}
            onValueChange={(itemValue, itemIndex) =>
              handleLanguageChange(itemValue)
            }>
            {languages.map((lang, i) => {
              return (
                <Picker.Item key={i} label={lang.label} value={lang.code} />
              );
            })}
          </StyledPickerIOS>
        ) : (
        <StyledPicker
          dropdownIconColor={colors.white}
          mode="dropdown"
          selectedValue={lang}
          onValueChange={(itemValue, itemIndex) =>
            handleLanguageChange(itemValue)
          }>
          {languages.map((lang, i) => {
            return <Picker.Item key={i} label={lang.label} value={lang.code} />;
          })}
        </StyledPicker>
        )}
      </SettingsRow>
    </SettingsContainer>
  );
};
export default PageSettings;
const styles = StyleSheet.create({
  language: {
    paddingTop: 10,
    textAlign: 'center',
  },
});
