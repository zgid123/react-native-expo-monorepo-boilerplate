import { Card as PaperCard, type CardProps } from 'react-native-paper';

import type { JSX } from 'react';

import { Title } from './Title';
import { Content } from './Content';
import { CardProvider } from './context';
import { useProps } from '../styles/hooks';

import type { TViewStyleProps } from '../styles/constants';

interface ICardProps
  extends CardProps,
    Omit<TViewStyleProps, 'style' | 'elevation' | 'pointerEvents'> {}

export function Card({
  style,
  mode = 'contained',
  ...rest
}: ICardProps): JSX.Element {
  const { props, styleProps } = useProps(rest);

  return (
    <CardProvider
      value={{
        borderRadius: styleProps.borderRadius,
      }}
    >
      <PaperCard {...props} mode={mode} style={[styleProps, style]} />
    </CardProvider>
  );
}

Card.Title = Title;
Card.Content = Content;

Card.displayName = 'CustomCard';
