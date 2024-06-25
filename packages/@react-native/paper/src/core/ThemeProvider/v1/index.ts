import { MD3LightTheme } from 'react-native-paper';

import type { FieldPath } from 'react-hook-form';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    white: '#fff',
    black: '#000',
  },
  spacing: {
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
    36: 144,
    40: 160,
    44: 176,
    48: 192,
    56: 224,
    60: 240,
    64: 256,
    72: 288,
    80: 320,
    96: 384,
  } as Record<string | number, number>,
};

export type TTheme = typeof theme;

export type TColors =
  | FieldPath<TTheme['colors']>
  | Omit<string, FieldPath<TTheme['colors']>>;

export type TSpacings = keyof TTheme['spacing'];
