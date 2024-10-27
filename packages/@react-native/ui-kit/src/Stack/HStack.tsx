import type { JSX } from 'react';
import type { ViewProps } from 'react-native';

import { useProps } from '../hooks';
import { Stack, type IStackProps } from './Stack';

import type { IViewStyleProps } from '../styling/styles/viewStyle';

export interface IHStackProps
  extends Omit<ViewProps, keyof IViewStyleProps>,
    IViewStyleProps {
  spacing?: IViewStyleProps['columnGap'];
}

export function HStack({
  style,
  spacing,
  children,
  ...rest
}: IStackProps): JSX.Element {
  const additionalProps: IViewStyleProps = {
    flexDirection: 'row',
  };

  if (spacing) {
    additionalProps.columnGap = spacing;
  }

  const { props, viewStyleProps } = useProps({
    ...additionalProps,
    ...rest,
  });

  return (
    <Stack {...props} style={[viewStyleProps, style]}>
      {children}
    </Stack>
  );
}

HStack.displayName = 'UIKitHStack';
