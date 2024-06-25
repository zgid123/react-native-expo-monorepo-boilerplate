import { Divider as PaperDivider, type DividerProps } from 'react-native-paper';

import type { JSX } from 'react';

import { useProps } from '../styles/hooks';

import type { TViewStyleProps } from '../styles/constants';

interface IDividerProps
  extends DividerProps,
    Omit<TViewStyleProps, 'pointerEvents'> {}

export function Divider({ style, ...rest }: IDividerProps): JSX.Element {
  const { props, styleProps } = useProps(rest);

  return <PaperDivider {...props} style={[styleProps, style]} />;
}

Divider.displayName = 'CustomDivider';
