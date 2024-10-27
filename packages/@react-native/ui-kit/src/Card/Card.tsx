import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import type { JSX } from 'react';

import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { useMultiStyleConfig } from '../hooks';
import { Stack, type IStackProps } from '../Stack';

import type { TCardPartsProps } from '../styling/components';

interface ICardProps extends IStackProps {
  onPress?: TouchableOpacityProps['onPress'];
}

export function Card({
  style,
  onPress,
  children,
  ...rest
}: ICardProps): JSX.Element {
  const { container } = useMultiStyleConfig<TCardPartsProps>('Card');

  return (
    <TouchableOpacity onPress={onPress}>
      <Stack {...rest} style={[container.viewStyleProps, style]}>
        {children}
      </Stack>
    </TouchableOpacity>
  );
}

Card.displayName = 'UIKitCard';

Card.Header = CardHeader;

Card.Content = CardContent;
