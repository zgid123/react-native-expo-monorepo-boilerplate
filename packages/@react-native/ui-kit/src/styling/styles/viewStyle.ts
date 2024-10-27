import type { FlexStyle, ViewStyle } from 'react-native';

import { shadowStyleIOSPropsMapping } from './atomic/shadowStyleIOS';
import { transformsStylePropsMapping } from './atomic/transformsStyle';
import {
  flexStylePropsMapping,
  type IFlexStyleProps,
} from './atomic/flexStyle';

import type { TColors } from '../../ThemeProvider/theme';

const viewStyleAlias = {
  bgColor: 'backgroundColor',
} as const;

export interface IViewStyleColorProps {
  backgroundColor?: TColors;
  bgColor?: TColors;
  borderBlockColor?: TColors;
  borderBlockEndColor?: TColors;
  borderBlockStartColor?: TColors;
  borderBottomColor?: TColors;
  borderColor?: TColors;
  borderEndColor?: TColors;
  borderLeftColor?: TColors;
  borderRightColor?: TColors;
  borderStartColor?: TColors;
  borderTopColor?: TColors;
}

export interface IViewStyleProps
  extends Omit<ViewStyle, keyof FlexStyle | keyof IViewStyleColorProps>,
    IFlexStyleProps,
    IViewStyleColorProps {}

export const viewStylePropsMapping: Record<
  keyof IViewStyleProps,
  keyof ViewStyle
> = {
  ...viewStyleAlias,
  ...flexStylePropsMapping,
  ...shadowStyleIOSPropsMapping,
  ...transformsStylePropsMapping,
  backfaceVisibility: 'backfaceVisibility',
  backgroundColor: 'backgroundColor',
  borderBlockColor: 'borderBlockColor',
  borderBlockEndColor: 'borderBlockEndColor',
  borderBlockStartColor: 'borderBlockStartColor',
  borderBottomColor: 'borderBottomColor',
  borderBottomEndRadius: 'borderBottomEndRadius',
  borderBottomLeftRadius: 'borderBottomLeftRadius',
  borderBottomRightRadius: 'borderBottomRightRadius',
  borderBottomStartRadius: 'borderBottomStartRadius',
  borderColor: 'borderColor',
  borderCurve: 'borderCurve',
  borderEndColor: 'borderEndColor',
  borderEndEndRadius: 'borderEndEndRadius',
  borderEndStartRadius: 'borderEndStartRadius',
  borderLeftColor: 'borderLeftColor',
  borderRadius: 'borderRadius',
  borderRightColor: 'borderRightColor',
  borderStartColor: 'borderStartColor',
  borderStartEndRadius: 'borderStartEndRadius',
  borderStartStartRadius: 'borderStartStartRadius',
  borderStyle: 'borderStyle',
  borderTopColor: 'borderTopColor',
  borderTopEndRadius: 'borderTopEndRadius',
  borderTopLeftRadius: 'borderTopLeftRadius',
  borderTopRightRadius: 'borderTopRightRadius',
  borderTopStartRadius: 'borderTopStartRadius',
  cursor: 'cursor',
  elevation: 'elevation',
  opacity: 'opacity',
  pointerEvents: 'pointerEvents',
};
