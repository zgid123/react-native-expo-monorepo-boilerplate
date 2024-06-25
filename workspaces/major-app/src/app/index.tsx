import { Title } from '@react-native/paper';
import { Stack } from '@react-native/paper/core';

import type { JSX } from 'react';

export default function Root(): JSX.Element {
  return (
    <Stack>
      <Title>Welcome to Major App</Title>
    </Stack>
  );
}
