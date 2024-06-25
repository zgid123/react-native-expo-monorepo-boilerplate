import { ActivityIndicator } from 'react-native-paper';

import type { JSX } from 'react';

import { VStack } from '../Stack';

export function Preloader(): JSX.Element {
  return (
    <VStack
      w='100%'
      h='100%'
      pos='absolute'
      alignItems='center'
      justifyContent='center'
    >
      <ActivityIndicator animating size='large' />
    </VStack>
  );
}

Preloader.displayName = 'CustomPreloader';
