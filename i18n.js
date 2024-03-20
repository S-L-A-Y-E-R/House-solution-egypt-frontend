import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationAr from './locales/ar/translation.json';
import translationEn from './locales/en/translation.json';

i18n.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      // order and from where user language should be detected
      order: ['path'], // detect language from the path
    },
    fallbackLng: ["en", "ar"],
    resources: {
      en: {
        translation: translationEn
      },
      ar: {
        translation: translationAr
      }
    },
    debug: false,
    interpolation: {
      escapeValue: false // not needed for React as it escapes by default
    }
  });
if (typeof window !== 'undefined') {
  i18n.on('languageChanged', (lng) => {
    if (lng === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  });
}
export default i18n;
