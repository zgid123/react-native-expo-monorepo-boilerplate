import {
  TouchableOpacity as ReactNativeTouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';

import type { JSX } from 'react';

import { useProps } from '../hooks';

import type { IViewStyleProps } from '../styling/styles';

export interface ITouchableOpacityProps
  extends Omit<TouchableOpacityProps, keyof IViewStyleProps>,
    IViewStyleProps {}

export function TouchableOpacity({
  style,
  ...rest
}: ITouchableOpacityProps): JSX.Element {
  const { props, viewStyleProps } = useProps(rest);

  return (
    <ReactNativeTouchableOpacity {...props} style={[viewStyleProps, style]} />
  );
}
