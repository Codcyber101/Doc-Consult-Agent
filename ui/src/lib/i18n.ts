'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import am from '../locales/am.json';

const resources = {
  en: { translation: en },
  am: { translation: am },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Always start with English to match SSR
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Listen for language changes to persist them
if (typeof window !== 'undefined') {
  i18n.on('languageChanged', (lng) => {
    localStorage.setItem('i18nextLng', lng);
  });
}

export default i18n;
