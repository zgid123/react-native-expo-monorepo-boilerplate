import type { FieldPath } from 'react-hook-form';

import {
  cardStyle,
  textStyle,
  modalStyle,
  inputStyle,
  buttonStyle,
  drawerStyle,
  dividerStyle,
  headingStyle,
  preloaderStyle,
  wheelPickerStyle,
} from '../styling/components';

import type {
  IStyleConfigProps,
  IMultiStyleConfigProps,
} from '../styling/utils';

const baseTheme = {
  colors: {
    white: '#fff',
    black: '#000',
    gray: {
      '50': '#fafafa',
      '100': '#f4f4f5',
      '200': '#e4e4e7',
      '300': '#d4d4d8',
      '400': '#a1a1aa',
      '500': '#71717a',
      '600': '#52525b',
      '700': '#3f3f46',
      '800': '#27272a',
      '900': '#18181b',
      '950': '#111111',
    },
    teal: {
      '50': '#f0fdfa',
      '100': '#ccfbf1',
      '200': '#99f6e4',
      '300': '#5eead4',
      '400': '#2dd4bf',
      '500': '#14b8a6',
      '600': '#0d9488',
      '700': '#0c5d56',
      '800': '#114240',
      '900': '#032726',
      '950': '#021716',
    },
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
  },
} as const;

export const theme = {
  ...baseTheme,
  components: {
    Button: buttonStyle,
    Card: cardStyle,
    Divider: dividerStyle,
    Drawer: drawerStyle,
    Heading: headingStyle,
    Input: inputStyle,
    Modal: modalStyle,
    Preloader: preloaderStyle,
    Text: textStyle,
    WheelPicker: wheelPickerStyle,
  },
} as const;

export type TTheme = DeepWriteable<typeof baseTheme>;

export type TColors =
  | FieldPath<TTheme['colors']>
  | Omit<string, FieldPath<TTheme['colors']>>;

export type TSpacings = keyof TTheme['spacing'];

export type TComponentsName = keyof (typeof theme)['components'];

export type TComponents = Record<
  TComponentsName,
  IStyleConfigProps | IMultiStyleConfigProps<string>
>;
