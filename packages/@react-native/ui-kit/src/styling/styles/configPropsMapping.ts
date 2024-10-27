import type { IViewStyleColorProps } from './viewStyle';
import type { ITextStyleColorProps } from './textStyle';
import type { IImageStyleColorProps } from './imageStyle';
import type { ITextStyleIOSColorProps } from './atomic/textStyleIOS';
import type { IShadowStyleIOSColorProps } from './atomic/shadowStyleIOS';

type TColorPropKeys = keyof (IViewStyleColorProps &
  IShadowStyleIOSColorProps &
  ITextStyleIOSColorProps &
  ITextStyleColorProps &
  IImageStyleColorProps);

export const colorPropsMapping: Record<TColorPropKeys, true> = {
  backgroundColor: true,
  bgColor: true,
  borderBlockColor: true,
  borderBlockEndColor: true,
  borderBlockStartColor: true,
  borderBottomColor: true,
  borderColor: true,
  borderEndColor: true,
  borderLeftColor: true,
  borderRightColor: true,
  borderStartColor: true,
  borderTopColor: true,
  color: true,
  overlayColor: true,
  shadowColor: true,
  textDecorationColor: true,
  textDecorColor: true,
  textShadowColor: true,
  tintColor: true,
};

export const spacingPropsMapping = {
  columnGap: true,
  gap: true,
  m: true,
  margin: true,
  marginBottom: true,
  marginEnd: true,
  marginHorizontal: true,
  marginLeft: true,
  marginRight: true,
  marginStart: true,
  marginTop: true,
  marginVertical: true,
  mb: true,
  ml: true,
  mr: true,
  mt: true,
  mx: true,
  my: true,
  p: true,
  padding: true,
  paddingBottom: true,
  paddingEnd: true,
  paddingHorizontal: true,
  paddingLeft: true,
  paddingRight: true,
  paddingStart: true,
  paddingTop: true,
  paddingVertical: true,
  pb: true,
  pl: true,
  pr: true,
  pt: true,
  px: true,
  py: true,
  rowGap: true,
} as const;
