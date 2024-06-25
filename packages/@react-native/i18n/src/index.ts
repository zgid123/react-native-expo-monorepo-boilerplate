import { i18n as i18next } from '@core/i18n';
import { initReactI18next, useTranslation } from 'react-i18next';

i18next.use(initReactI18next).init();

export const useI18n = useTranslation;

export const i18n = i18next;
