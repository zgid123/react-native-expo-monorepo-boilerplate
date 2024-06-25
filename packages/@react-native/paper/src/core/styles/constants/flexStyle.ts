import type { FlexAlignType, DimensionValue } from 'react-native';

import type { TSpacings } from '../../ThemeProvider/v1';

export interface IFlexStyleProps {
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around';
  alignItems?: FlexAlignType;
  alignSelf?: 'auto' | FlexAlignType;
  columnGap?: number | TSpacings;
  direction?: 'inherit' | 'ltr' | 'rtl';
  flex?: number;
  flexBasis?: DimensionValue;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  gap?: number | TSpacings;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  rowGap?: number | TSpacings;
}

export const flexPropsMapping: Record<
  keyof IFlexStyleProps,
  keyof IFlexStyleProps
> = {
  alignContent: 'alignContent',
  alignItems: 'alignItems',
  alignSelf: 'alignSelf',
  columnGap: 'columnGap',
  direction: 'direction',
  flex: 'flex',
  flexBasis: 'flexBasis',
  flexDirection: 'flexDirection',
  flexGrow: 'flexGrow',
  flexShrink: 'flexShrink',
  flexWrap: 'flexWrap',
  gap: 'gap',
  justifyContent: 'justifyContent',
  rowGap: 'rowGap',
};
