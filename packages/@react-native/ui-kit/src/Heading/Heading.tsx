import { Text as RNText, type TextProps } from 'react-native';

import type { JSX } from 'react';

import { useProps, useStyleConfig } from '../hooks';

import type { THeadingSizes } from '../styling/components';
import type { ITextStyleProps } from '../styling/styles/textStyle';

interface IHeadingProps
  extends Omit<TextProps, keyof ITextStyleProps>,
    ITextStyleProps {
  size?: THeadingSizes;
}

export function Heading({
  size,
  style,
  children,
  ...rest
}: IHeadingProps): JSX.Element {
  const { props, textStyleProps } = useProps({
    ...rest,
  });

  const { textStyleProps: textDefaultStyleProps } = useStyleConfig('Heading', {
    size,
  });

  return (
    <RNText {...props} style={[textDefaultStyleProps, textStyleProps, style]}>
      {children}
    </RNText>
  );
}

Heading.displayName = 'UIKitHeading';
