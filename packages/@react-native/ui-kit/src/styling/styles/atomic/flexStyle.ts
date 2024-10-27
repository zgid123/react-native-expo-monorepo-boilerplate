import type { FlexStyle } from 'react-native';

export interface IFlexStyleProps extends FlexStyle {
  h?: FlexStyle['height'];
  m?: FlexStyle['margin'];
  maxH?: FlexStyle['maxHeight'];
  maxW?: FlexStyle['maxWidth'];
  mb?: FlexStyle['marginBottom'];
  minH?: FlexStyle['minHeight'];
  minW?: FlexStyle['minWidth'];
  ml?: FlexStyle['marginLeft'];
  mr?: FlexStyle['marginRight'];
  mt?: FlexStyle['marginTop'];
  mx?: FlexStyle['marginHorizontal'];
  my?: FlexStyle['marginVertical'];
  p?: FlexStyle['padding'];
  pb?: FlexStyle['paddingBottom'];
  pl?: FlexStyle['paddingLeft'];
  pos?: FlexStyle['position'];
  pr?: FlexStyle['paddingRight'];
  pt?: FlexStyle['paddingTop'];
  px?: FlexStyle['paddingHorizontal'];
  py?: FlexStyle['paddingVertical'];
  w?: FlexStyle['width'];
}

const flexStyleAlias: Record<
  keyof Omit<IFlexStyleProps, keyof FlexStyle>,
  keyof FlexStyle
> = {
  h: 'height',
  m: 'margin',
  maxH: 'maxHeight',
  maxW: 'maxWidth',
  mb: 'marginBottom',
  minH: 'minHeight',
  minW: 'minWidth',
  ml: 'marginLeft',
  mr: 'marginRight',
  mt: 'marginTop',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  p: 'padding',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pos: 'position',
  pr: 'paddingRight',
  pt: 'paddingTop',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
  w: 'width',
};

export const flexStylePropsMapping: Record<
  keyof IFlexStyleProps,
  keyof FlexStyle
> = {
  ...flexStyleAlias,
  alignContent: 'alignContent',
  alignItems: 'alignItems',
  alignSelf: 'alignSelf',
  aspectRatio: 'aspectRatio',
  borderBottomWidth: 'borderBottomWidth',
  borderEndWidth: 'borderEndWidth',
  borderLeftWidth: 'borderLeftWidth',
  borderRightWidth: 'borderRightWidth',
  borderStartWidth: 'borderStartWidth',
  borderTopWidth: 'borderTopWidth',
  borderWidth: 'borderWidth',
  bottom: 'bottom',
  columnGap: 'columnGap',
  direction: 'direction',
  display: 'display',
  end: 'end',
  flex: 'flex',
  flexBasis: 'flexBasis',
  flexDirection: 'flexDirection',
  flexGrow: 'flexGrow',
  flexShrink: 'flexShrink',
  flexWrap: 'flexWrap',
  gap: 'gap',
  height: 'height',
  justifyContent: 'justifyContent',
  left: 'left',
  margin: 'margin',
  marginBottom: 'marginBottom',
  marginEnd: 'marginEnd',
  marginHorizontal: 'marginHorizontal',
  marginLeft: 'marginLeft',
  marginRight: 'marginRight',
  marginStart: 'marginStart',
  marginTop: 'marginTop',
  marginVertical: 'marginVertical',
  maxHeight: 'maxHeight',
  maxWidth: 'maxWidth',
  minHeight: 'minHeight',
  minWidth: 'minWidth',
  overflow: 'overflow',
  padding: 'padding',
  paddingBottom: 'paddingBottom',
  paddingEnd: 'paddingEnd',
  paddingHorizontal: 'paddingHorizontal',
  paddingLeft: 'paddingLeft',
  paddingRight: 'paddingRight',
  paddingStart: 'paddingStart',
  paddingTop: 'paddingTop',
  paddingVertical: 'paddingVertical',
  position: 'position',
  right: 'right',
  rowGap: 'rowGap',
  start: 'start',
  top: 'top',
  width: 'width',
  zIndex: 'zIndex',
};
