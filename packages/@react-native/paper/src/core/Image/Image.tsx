import { Image as RNImage, type ImageProps } from 'react-native';

import type { JSX } from 'react';

import { useProps } from '../styles/hooks';

import type { TViewStyleKeys, TViewStyleProps } from '../styles/constants';

interface IImageProps
  extends Omit<ImageProps, TViewStyleKeys>,
    TViewStyleProps {}

export function Image({ style, ...rest }: IImageProps): JSX.Element {
  const { props, styleProps } = useProps(rest);

  return <RNImage {...props} style={[styleProps, style]} />;
}

Image.displayName = 'CustomImage';
