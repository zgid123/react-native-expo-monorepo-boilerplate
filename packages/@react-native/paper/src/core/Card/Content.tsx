import { Card, type CardContentProps } from 'react-native-paper';

import type { JSX } from 'react';

import { useCardContext } from './context';
import { useProps } from '../styles/hooks';

import type { TViewStyleProps } from '../styles/constants';

interface IContentProps
  extends CardContentProps,
    Omit<TViewStyleProps, 'pointerEvents'> {}

export function Content({ style, ...rest }: IContentProps): JSX.Element {
  const { borderRadius, ...contextStyle } = useCardContext();

  const { props, styleProps } = useProps({
    bgColor: 'white',
    ...rest,
  });

  return (
    <Card.Content
      {...props}
      style={[
        styleProps,
        style,
        contextStyle,
        {
          borderBottomEndRadius: borderRadius,
          borderBottomStartRadius: borderRadius,
        },
      ]}
    />
  );
}

Content.displayName = 'CustomCardContent';
