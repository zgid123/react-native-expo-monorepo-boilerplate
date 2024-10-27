import { Image as RNImage, type ImageProps } from 'react-native';

import type { JSX } from 'react';

import { useProps } from '../hooks';

import type { IImageStyleProps } from '../styling/styles';

interface IImageProps
  extends Omit<ImageProps, keyof IImageStyleProps>,
    IImageStyleProps {}

export function Image({ style, ...rest }: IImageProps): JSX.Element {
  const { props, imageStyleProps } = useProps({
    ...rest,
  });

  return <RNImage {...props} style={[imageStyleProps, style]} />;
}

Image.displayName = 'UIKitImage';
