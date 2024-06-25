import type { JSX } from 'react';

import { Stack, type IStackProps } from '../Stack';

export function Form({ children, ...rest }: IStackProps): JSX.Element {
  return <Stack {...rest}>{children}</Stack>;
}

Form.displayName = 'CustomForm';
