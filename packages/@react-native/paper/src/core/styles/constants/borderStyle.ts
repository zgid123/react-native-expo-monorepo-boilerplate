import type { AnimatableNumericValue } from 'react-native';

import type { TColors } from '../../ThemeProvider/v1';

export interface IBorderStyleProps {
  borderBlockColor?: TColors;
  borderBlockEndColor?: TColors;
  borderBlockStartColor?: TColors;
  borderBottomColor?: TColors;
  borderBottomEndRadius?: AnimatableNumericValue;
  borderBottomLeftRadius?: AnimatableNumericValue;
  borderBottomRightRadius?: AnimatableNumericValue;
  borderBottomStartRadius?: AnimatableNumericValue;
  borderBottomWidth?: number;
  borderColor?: TColors;
  borderCurve?: 'circular' | 'continuous';
  borderEndColor?: TColors;
  borderEndEndRadius?: AnimatableNumericValue;
  borderEndStartRadius?: AnimatableNumericValue;
  borderEndWidth?: number;
  borderLeftColor?: TColors;
  borderLeftWidth?: number;
  borderRadius?: AnimatableNumericValue;
  borderRightColor?: TColors;
  borderRightWidth?: number;
  borderStartColor?: TColors;
  borderStartEndRadius?: AnimatableNumericValue;
  borderStartStartRadius?: AnimatableNumericValue;
  borderStartWidth?: number;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
  borderTopColor?: TColors;
  borderTopEndRadius?: AnimatableNumericValue;
  borderTopLeftRadius?: AnimatableNumericValue;
  borderTopRightRadius?: AnimatableNumericValue;
  borderTopStartRadius?: AnimatableNumericValue;
  borderTopWidth?: number;
  borderWidth?: number;
}

export const borderPropsMapping: Record<
  keyof IBorderStyleProps,
  keyof IBorderStyleProps
> = {
  borderBlockColor: 'borderBlockColor',
  borderBlockEndColor: 'borderBlockEndColor',
  borderBlockStartColor: 'borderBlockStartColor',
  borderBottomColor: 'borderBottomColor',
  borderBottomEndRadius: 'borderBottomEndRadius',
  borderBottomLeftRadius: 'borderBottomLeftRadius',
  borderBottomRightRadius: 'borderBottomRightRadius',
  borderBottomStartRadius: 'borderBottomStartRadius',
  borderBottomWidth: 'borderBottomWidth',
  borderColor: 'borderColor',
  borderCurve: 'borderCurve',
  borderEndColor: 'borderEndColor',
  borderEndEndRadius: 'borderEndEndRadius',
  borderEndStartRadius: 'borderEndStartRadius',
  borderEndWidth: 'borderEndWidth',
  borderLeftColor: 'borderLeftColor',
  borderLeftWidth: 'borderLeftWidth',
  borderRadius: 'borderRadius',
  borderRightColor: 'borderRightColor',
  borderRightWidth: 'borderRightWidth',
  borderStartColor: 'borderStartColor',
  borderStartEndRadius: 'borderStartEndRadius',
  borderStartStartRadius: 'borderStartStartRadius',
  borderStartWidth: 'borderStartWidth',
  borderStyle: 'borderStyle',
  borderTopColor: 'borderTopColor',
  borderTopEndRadius: 'borderTopEndRadius',
  borderTopLeftRadius: 'borderTopLeftRadius',
  borderTopRightRadius: 'borderTopRightRadius',
  borderTopStartRadius: 'borderTopStartRadius',
  borderTopWidth: 'borderTopWidth',
  borderWidth: 'borderWidth',
};
