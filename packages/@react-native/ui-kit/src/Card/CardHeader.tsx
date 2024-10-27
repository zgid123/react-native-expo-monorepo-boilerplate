import type { JSX } from 'react';

import { useMultiStyleConfig } from '../hooks';
import { Stack, type IStackProps } from '../Stack';

import type { TCardPartsProps } from '../styling/components';

export interface ICardHeaderProps extends IStackProps {}

export function CardHeader({
  style,
  children,
  ...rest
}: ICardHeaderProps): JSX.Element {
  const { header } = useMultiStyleConfig<TCardPartsProps>('Card');

  return (
    <Stack {...rest} style={[header.viewStyleProps, style]}>
      {children}
    </Stack>
  );
}

CardHeader.displayName = 'UIKitCardHeader';
