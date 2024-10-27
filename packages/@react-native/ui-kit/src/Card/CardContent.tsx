import type { JSX } from 'react';

import { useMultiStyleConfig } from '../hooks';
import { Stack, type IStackProps } from '../Stack';

import type { TCardPartsProps } from '../styling/components';

interface ICardContentProps extends IStackProps {}

export function CardContent({
  style,
  children,
  ...rest
}: ICardContentProps): JSX.Element {
  const { header } = useMultiStyleConfig<TCardPartsProps>('Card');

  return (
    <Stack {...rest} style={[header.viewStyleProps, style]}>
      {children}
    </Stack>
  );
}

CardContent.displayName = 'UIKitCardContent';
