import type { StyleProp } from 'react-native';

export function flatStyle<T>(style: StyleProp<T>): T {
  if (Array.isArray(style)) {
    return style.reduce((result, styl) => {
      return Object.assign(result, styl);
    }, {}) as T;
  }

  return (style || {}) as T;
}
