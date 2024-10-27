import Animated from 'react-native-reanimated';

import type { JSX } from 'react';
import type { ViewProps } from 'react-native';

import { useProps } from '../../hooks';

import type { IViewStyleProps } from '../../styling/styles';

interface IAnimatedViewProps
  extends Omit<ViewProps, keyof IViewStyleProps>,
    IViewStyleProps {}

export function AnimatedView({
  style,
  children,
  ...rest
}: IAnimatedViewProps): JSX.Element {
  const { props, viewStyleProps } = useProps(rest);

  return (
    <Animated.View style={[viewStyleProps, style]} {...props}>
      {children}
    </Animated.View>
  );
}

AnimatedView.displayName = 'UIKitAnimatedView';
