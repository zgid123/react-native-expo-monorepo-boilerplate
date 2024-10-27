import type { TextStyleAndroid } from 'react-native';

import type { IViewStyleProps } from '../viewStyle';

export interface ITextStyleAndroidProps
  extends Omit<TextStyleAndroid, keyof IViewStyleProps> {}

export const textStyleAndroidPropsMapping: Record<
  keyof ITextStyleAndroidProps,
  keyof TextStyleAndroid
> = {
  includeFontPadding: 'includeFontPadding',
  textAlignVertical: 'textAlignVertical',
  verticalAlign: 'verticalAlign',
};
