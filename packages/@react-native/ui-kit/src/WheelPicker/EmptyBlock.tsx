import type { JSX } from 'react';

import { Stack, type IStackProps } from '../Stack';

export function EmptyBlock(props: IStackProps): JSX.Element {
  return <Stack flex={1} {...props} />;
}
