import type { JSX } from 'react';

import { useStyleConfig } from '../hooks';
import { Stack, type IStackProps } from '../Stack';

interface IDividerProps extends IStackProps {}

export function Divider(props: IDividerProps): JSX.Element {
  const { viewStyleProps } = useStyleConfig('Divider');

  return <Stack {...props} style={viewStyleProps} />;
}

Divider.displayName = 'UIKitDivider';
