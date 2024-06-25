import { Card, type CardTitleProps } from 'react-native-paper';

import type { JSX } from 'react';

import { useCardContext } from './context';
import { flatStyle } from '../utils/styleUtils';
import { useProps, useStyleProps } from '../styles/hooks';

import type { TViewStyleProps } from '../styles/constants';

interface ITitleProps
  extends Omit<CardTitleProps, 'left' | 'right'>,
    Omit<TViewStyleProps, 'pointerEvents'> {
  leftElement?: CardTitleProps['left'];
  rightElement?: CardTitleProps['right'];
}

export function Title({
  style,
  titleStyle,
  leftElement,
  rightElement,
  ...rest
}: ITitleProps): JSX.Element {
  const { borderRadius, ...contextStyle } = useCardContext();
  const { props, styleProps } = useProps(rest);

  const titleStyleProps = useStyleProps({
    pr: 0,
    minH: 'auto',
    ...(flatStyle(titleStyle) as TViewStyleProps),
  });

  return (
    <Card.Title
      {...props}
      left={leftElement}
      right={rightElement}
      titleStyle={titleStyleProps}
      style={[
        styleProps,
        style,
        contextStyle,
        {
          borderTopEndRadius: borderRadius,
          borderTopStartRadius: borderRadius,
        },
      ]}
    />
  );
}

Title.displayName = 'CustomCardTitle';
