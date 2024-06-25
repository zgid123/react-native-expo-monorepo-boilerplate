import { View, type ViewProps } from 'react-native';

import type { JSX } from 'react';

import { useProps } from '../styles/hooks';

import type { TViewStyleKeys, TViewStyleProps } from '../styles/constants';

export interface IStackProps
  extends Omit<ViewProps, TViewStyleKeys>,
    TViewStyleProps {
  spacing?: TViewStyleProps['gap'];
}

export function Stack({
  style,
  spacing,
  children,
  ...rest
}: IStackProps): JSX.Element {
  const additionalProps: TViewStyleProps = {};

  if (spacing) {
    additionalProps.rowGap = spacing;
  }

  const { props, styleProps } = useProps({
    ...rest,
    ...additionalProps,
  });

  return (
    <View {...props} style={[styleProps, style]}>
      {children}
    </View>
  );
}

Stack.displayName = 'CustomStack';
