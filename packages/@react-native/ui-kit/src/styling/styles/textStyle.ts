import type { TextStyle, ViewStyle } from 'react-native';

import {
  textStyleIOSPropsMapping,
  type ITextStyleIOSProps,
} from './atomic/textStyleIOS';
import {
  textStyleAndroidPropsMapping,
  type ITextStyleAndroidProps,
} from './atomic/textStyleAndroid';
import type { TColors } from '../../ThemeProvider/theme';

export interface ITextStyleColorProps {
  color?: TColors;
  textShadowColor?: TColors;
  textDecorationColor?: TColors;
}

interface ITextStyleFontProps {}

export interface ITextStyleProps
  extends Omit<
      TextStyle,
      | keyof ViewStyle
      | keyof ITextStyleIOSProps
      | keyof ITextStyleFontProps
      | keyof ITextStyleColorProps
      | keyof ITextStyleAndroidProps
    >,
    ITextStyleIOSProps,
    ITextStyleFontProps,
    ITextStyleColorProps,
    ITextStyleAndroidProps {}

export const textStylePropsMapping: Record<
  keyof ITextStyleProps,
  keyof TextStyle
> = {
  ...textStyleIOSPropsMapping,
  ...textStyleAndroidPropsMapping,
  color: 'color',
  fontFamily: 'fontFamily',
  fontSize: 'fontSize',
  fontStyle: 'fontStyle',
  fontWeight: 'fontWeight',
  letterSpacing: 'letterSpacing',
  lineHeight: 'lineHeight',
  textAlign: 'textAlign',
  textDecorationLine: 'textDecorationLine',
  textDecorationStyle: 'textDecorationStyle',
  textDecorationColor: 'textDecorationColor',
  textShadowColor: 'textShadowColor',
  textShadowOffset: 'textShadowOffset',
  textShadowRadius: 'textShadowRadius',
  textTransform: 'textTransform',
  userSelect: 'userSelect',
};
