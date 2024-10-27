import { Text as RNText, type TextProps } from 'react-native';

import type { JSX } from 'react';

import { useProps, useStyleConfig } from '../hooks';

import type { TTextSizes } from '../styling/components';
import type { ITextStyleProps } from '../styling/styles/textStyle';

export interface ITextProps
  extends Omit<TextProps, keyof ITextStyleProps>,
    ITextStyleProps {
  size?: TTextSizes;
}

export function Text({
  size,
  style,
  children,
  ...rest
}: ITextProps): JSX.Element {
  const { props, textStyleProps } = useProps({
    ...rest,
  });

  const { textStyleProps: textDefaultStyleProps } = useStyleConfig('Text', {
    size,
  });

  return (
    <RNText {...props} style={[textDefaultStyleProps, textStyleProps, style]}>
      {children}
    </RNText>
  );
}

Text.displayName = 'UIKitText';
