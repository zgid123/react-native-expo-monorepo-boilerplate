import type { DimensionValue } from 'react-native';

import type { TSpacings } from '../../ThemeProvider/v1';

export interface ISpacingStyleProps {
  m?: DimensionValue | TSpacings;
  margin?: DimensionValue | TSpacings;
  marginBottom?: DimensionValue | TSpacings;
  marginEnd?: DimensionValue | TSpacings;
  marginHorizontal?: DimensionValue | TSpacings;
  marginLeft?: DimensionValue | TSpacings;
  marginRight?: DimensionValue | TSpacings;
  marginStart?: DimensionValue | TSpacings;
  marginTop?: DimensionValue | TSpacings;
  marginVertical?: DimensionValue | TSpacings;
  mb?: DimensionValue | TSpacings;
  ml?: DimensionValue | TSpacings;
  mr?: DimensionValue | TSpacings;
  mt?: DimensionValue | TSpacings;
  mx?: DimensionValue | TSpacings;
  my?: DimensionValue | TSpacings;
  p?: DimensionValue | TSpacings;
  padding?: DimensionValue | TSpacings;
  paddingBottom?: DimensionValue | TSpacings;
  paddingEnd?: DimensionValue | TSpacings;
  paddingHorizontal?: DimensionValue | TSpacings;
  paddingLeft?: DimensionValue | TSpacings;
  paddingRight?: DimensionValue | TSpacings;
  paddingStart?: DimensionValue | TSpacings;
  paddingTop?: DimensionValue | TSpacings;
  paddingVertical?: DimensionValue | TSpacings;
  pb?: DimensionValue | TSpacings;
  pl?: DimensionValue | TSpacings;
  pr?: DimensionValue | TSpacings;
  pt?: DimensionValue | TSpacings;
  px?: DimensionValue | TSpacings;
  py?: DimensionValue | TSpacings;
}

export const spacingPropsMapping: Record<
  keyof ISpacingStyleProps,
  keyof ISpacingStyleProps
> = {
  m: 'margin',
  margin: 'margin',
  marginBottom: 'marginBottom',
  marginEnd: 'marginEnd',
  marginHorizontal: 'marginHorizontal',
  marginLeft: 'marginLeft',
  marginRight: 'marginRight',
  marginStart: 'marginStart',
  marginTop: 'marginTop',
  marginVertical: 'marginVertical',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
  mt: 'marginTop',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  p: 'padding',
  padding: 'padding',
  paddingBottom: 'paddingBottom',
  paddingEnd: 'paddingEnd',
  paddingHorizontal: 'paddingHorizontal',
  paddingLeft: 'paddingLeft',
  paddingRight: 'paddingRight',
  paddingStart: 'paddingStart',
  paddingTop: 'paddingTop',
  paddingVertical: 'paddingVertical',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  pt: 'paddingTop',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
};
