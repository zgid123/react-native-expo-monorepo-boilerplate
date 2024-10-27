import { View, type ViewProps } from 'react-native';

import type { JSX } from 'react';

import { useProps } from '../hooks';

import type { IViewStyleProps } from '../styling/styles/viewStyle';

export interface IStackProps
  extends Omit<ViewProps, keyof IViewStyleProps>,
    IViewStyleProps {
  spacing?: IViewStyleProps['rowGap'];
}

export function Stack({
  style,
  spacing,
  children,
  ...rest
}: IStackProps): JSX.Element {
  const additionalProps: IViewStyleProps = {};

  if (spacing) {
    additionalProps.rowGap = spacing;
  }

  const { props, viewStyleProps } = useProps({
    ...additionalProps,
    ...rest,
  });

  return (
    <View {...props} style={[viewStyleProps, style]}>
      {children}
    </View>
  );
}

Stack.displayName = 'UIKitStack';
