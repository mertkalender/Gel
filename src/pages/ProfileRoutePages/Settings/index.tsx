import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  SettingsContainer,
  SettingsItemText,
  SettingsRow,
  StyledPicker,
} from './style';
import {Picker} from '@react-native-picker/picker';
import i18next from 'i18next';

const PageSettings = () => {
  const selectedLanguageCode = i18next.language;
  const [lang, changeLang] = useState(selectedLanguageCode);
  const {t} = useTranslation();

  const languages = [
    {code: 'en', label: t('language:english')},
    {code: 'tr', label: t('language:turkish')},
  ];
  const handleLanguageChange = (language: string) => {
    console.log(language);
    changeLang(language);
    i18next.changeLanguage(language);
  };

  return (
    <SettingsContainer>
      <SettingsRow>
        <SettingsItemText>{t('settings:language')}:</SettingsItemText>
        <StyledPicker
          dropdownIconColor={'#fff'}
          mode="dropdown"
          selectedValue={lang}
          onValueChange={(itemValue, itemIndex) =>
            handleLanguageChange(itemValue)
          }>
          {languages.map((lang, i) => {
            return <Picker.Item key={i} label={lang.label} value={lang.code} />;
          })}
        </StyledPicker>
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
