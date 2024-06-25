import type { JSX } from 'react';
import type { ViewProps } from 'react-native';

import { useProps } from '../styles/hooks';
import { Stack, type IStackProps } from './Stack';

import type { TViewStyleKeys, TViewStyleProps } from '../styles/constants';

export interface IHStackProps
  extends Omit<ViewProps, TViewStyleKeys>,
    TViewStyleProps {
  spacing?: TViewStyleProps['gap'];
}

export function HStack({
  style,
  spacing,
  children,
  ...rest
}: IStackProps): JSX.Element {
  const additionalProps: TViewStyleProps = {
    flexDirection: 'row',
  };

  if (spacing) {
    additionalProps.columnGap = spacing;
  }

  const { props, styleProps } = useProps({
    ...rest,
    ...additionalProps,
  });

  return (
    <Stack {...props} style={[styleProps, style]}>
      {children}
    </Stack>
  );
}

HStack.displayName = 'CustomHStack';
