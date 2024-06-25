import {
  SafeAreaView as SAV,
  type SafeAreaViewProps,
} from 'react-native-safe-area-context';

import type { JSX } from 'react';

import { useProps } from '../styles/hooks';

import type { TViewStyleKeys, TViewStyleProps } from '../styles/constants';

interface ISafeAreaView
  extends Omit<SafeAreaViewProps, TViewStyleKeys>,
    TViewStyleProps {}

export function SafeAreaView({ style, ...rest }: ISafeAreaView): JSX.Element {
  const { props: componentProps, styleProps } = useProps(rest);

  return <SAV {...componentProps} style={[styleProps, style]} />;
}

SafeAreaView.displayName = 'CustomSafeAreaView';
