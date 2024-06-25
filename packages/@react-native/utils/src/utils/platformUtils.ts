import { Platform } from 'react-native';

export function isAndroid(): boolean {
  return Platform.OS === 'android';
}

export function isIos(): boolean {
  return Platform.OS === 'ios';
}
