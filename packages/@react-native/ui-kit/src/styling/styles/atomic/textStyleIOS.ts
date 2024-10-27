import type { TextStyleIOS } from 'react-native';

import type { IViewStyleProps } from '../viewStyle';
import type { TColors } from '../../../ThemeProvider/theme';

const textStyleIOSAlias = {
  textDecorColor: 'textDecorationColor',
  textDecorStyle: 'textDecorationStyle',
} as const;

export interface ITextStyleIOSColorProps {
  textDecorColor?: TColors;
  textDecorationColor?: TColors;
}

type TColorPropKeys = keyof ITextStyleIOSColorProps;

export interface ITextStyleIOSProps
  extends Omit<TextStyleIOS, TColorPropKeys | keyof IViewStyleProps>,
    ITextStyleIOSColorProps {
  textDecorStyle?: TextStyleIOS['textDecorationStyle'];
}

export const textStyleIOSPropsMapping: Record<
  keyof ITextStyleIOSProps,
  keyof TextStyleIOS
> = {
  ...textStyleIOSAlias,
  fontVariant: 'fontVariant',
  textDecorationColor: 'textDecorationColor',
  textDecorationStyle: 'textDecorationStyle',
  writingDirection: 'writingDirection',
};
