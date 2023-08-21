// import i18n from 'i18next';
// import initReactI18next from 'i18next';
// import { defaultLanguage, isLanguagesResourcesValid, languagesResources } from '@config/languageConfig';
// import { makeSelectBaseLanguage } from '@redux/settings/selectors';
// import { store } from '@redux/index';
// // translation catalog

// const languageDetector = {
//   type: 'languageDetector',
//   async: true,
//   detect: (cb: (baseLanguage: string) => void) => {
//     let prevLanguage: string;
//     store.subscribe(() => {
//       const selectBaseLanguage = makeSelectBaseLanguage();
//       const baseLanguage = selectBaseLanguage(store.getState());
//       if (baseLanguage !== prevLanguage) {
//         prevLanguage = baseLanguage;
//         cb(baseLanguage);
//       }
//     });
//   },
//   init: () => {},
//   cacheUserLanguage: () => {},
// };

// export const setLocalization = () => {
//   const local_firebase = store.getState().config.check.localization;
//   let resourcesRemote: any = null;

//   local_firebase !== undefined && (resourcesRemote = local_firebase);

//   i18n
//     .use(languageDetector)
//     .use(initReactI18next) // passes i18n down to react-i18next
//     .init({
//       debug: true,
//       resources:
//         local_firebase !== undefined && isLanguagesResourcesValid(resourcesRemote)
//           ? resourcesRemote
//           : languagesResources,
//       // language to use if translations in user language are not available.
//       fallbackLng: defaultLanguage,
//       interpolation: {
//         escapeValue: false, // not needed for react as it escapes by default
//       },
//       react: {
//         wait: false,
//         useSuspense: false,
//       },
//     });
// };

// setLocalization();

// export default i18n;
