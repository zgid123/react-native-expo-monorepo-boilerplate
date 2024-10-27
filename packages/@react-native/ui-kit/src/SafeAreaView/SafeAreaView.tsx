import {
  SafeAreaView as SAV,
  type SafeAreaViewProps,
} from 'react-native-safe-area-context';

import type { JSX } from 'react';

import { useProps } from '../hooks';

import type { IViewStyleProps } from '../styling/styles';

interface ISafeAreaView
  extends Omit<SafeAreaViewProps, keyof IViewStyleProps>,
    IViewStyleProps {}

export function SafeAreaView({ style, ...rest }: ISafeAreaView): JSX.Element {
  const { props: componentProps, viewStyleProps } = useProps(rest);

  return <SAV {...componentProps} style={[viewStyleProps, style]} />;
}

SafeAreaView.displayName = 'UIKitSafeAreaView';
