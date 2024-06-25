import 'intl-pluralrules';

import i18next from 'i18next';

import { en } from './locales/en';

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'trans',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      trans: en,
    },
  },
});

export const i18n = i18next;

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      trans: ITranslationProps;
    };
  }
}
