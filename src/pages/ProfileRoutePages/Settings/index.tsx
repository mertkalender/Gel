import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  PickerContainer,
  SettingsContainer,
  SettingsItemText,
  SettingsRow,
} from './style';
import i18next from 'i18next';
import {colors} from '../../../constants/colors';
import DropDownPicker from 'react-native-dropdown-picker';

const PageSettings = () => {
  const selectedLanguageCode = i18next.language;
  const [lang, changeLang] = useState(selectedLanguageCode);
  const [open, setOpen] = useState(false);
  const {t} = useTranslation();

  const languages = [
    {value: 'en', label: t('settings:english')},
    {value: 'tr', label: t('settings:turkish')},
  ];

  useEffect(() => {
    i18next.changeLanguage(lang);
  }, [lang]);

  return (
    <SettingsContainer>
      <SettingsRow>
        <SettingsItemText>{t('settings:language')}</SettingsItemText>
        <PickerContainer>
          <DropDownPicker
            open={open}
            value={lang}
            items={languages}
            setOpen={setOpen}
            setValue={changeLang}
            style={{
              backgroundColor: colors.background,
            }}
            dropDownContainerStyle={{
              backgroundColor: 'transparent',
            }}
            textStyle={{
              color: colors.orange,
            }}
          />
        </PickerContainer>
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
