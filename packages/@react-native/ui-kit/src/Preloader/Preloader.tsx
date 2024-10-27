import { ActivityIndicator } from 'react-native';

import type { JSX } from 'react';

import { useMultiStyleConfig } from '../hooks';
import { VStack, type IStackProps } from '../Stack';

import type { TPreloaderPartsProps } from '../styling/components';

export function Preloader({ style, ...rest }: IStackProps): JSX.Element {
  const { container } = useMultiStyleConfig<TPreloaderPartsProps>('Preloader');

  return (
    <VStack style={[container.viewStyleProps, style]} {...rest}>
      <ActivityIndicator animating size='large' />
    </VStack>
  );
}
