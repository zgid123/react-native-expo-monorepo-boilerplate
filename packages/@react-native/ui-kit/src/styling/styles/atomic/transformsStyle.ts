import type { TransformsStyle } from 'react-native';

export interface ITransformsStyleProps extends TransformsStyle {}

export const transformsStylePropsMapping: Record<
  keyof ITransformsStyleProps,
  keyof TransformsStyle
> = {
  rotation: 'rotation',
  scaleX: 'scaleX',
  scaleY: 'scaleY',
  transform: 'transform',
  transformMatrix: 'transformMatrix',
  transformOrigin: 'transformOrigin',
  translateX: 'translateX',
  translateY: 'translateY',
};
