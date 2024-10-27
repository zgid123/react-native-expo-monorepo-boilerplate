import type { FlexStyle, ImageStyle } from 'react-native';

import { shadowStyleIOSPropsMapping } from './atomic/shadowStyleIOS';
import { transformsStylePropsMapping } from './atomic/transformsStyle';
import {
  flexStylePropsMapping,
  type IFlexStyleProps,
} from './atomic/flexStyle';

import type { TColors } from '../../ThemeProvider/theme';

const imageStyleAlias = {
  bgColor: 'backgroundColor',
} as const;

export interface IImageStyleColorProps {
  backgroundColor?: TColors;
  bgColor?: TColors;
  borderColor?: TColors;
  overlayColor?: TColors;
  tintColor?: TColors;
}

export interface IImageStyleProps
  extends Omit<ImageStyle, keyof FlexStyle | keyof IImageStyleColorProps>,
    IFlexStyleProps,
    IImageStyleColorProps {}

export const imageStylePropsMapping: Record<
  keyof IImageStyleProps,
  keyof ImageStyle
> = {
  ...imageStyleAlias,
  ...flexStylePropsMapping,
  ...shadowStyleIOSPropsMapping,
  ...transformsStylePropsMapping,
  backfaceVisibility: 'backfaceVisibility',
  backgroundColor: 'backgroundColor',
  borderBottomLeftRadius: 'borderBottomLeftRadius',
  borderBottomRightRadius: 'borderBottomRightRadius',
  borderColor: 'borderColor',
  borderRadius: 'borderRadius',
  borderTopLeftRadius: 'borderTopLeftRadius',
  borderTopRightRadius: 'borderTopRightRadius',
  cursor: 'cursor',
  objectFit: 'objectFit',
  opacity: 'opacity',
  overflow: 'overflow',
  overlayColor: 'overlayColor',
  resizeMode: 'resizeMode',
  tintColor: 'tintColor',
};
