import { Text as PaperText, type TextProps } from 'react-native-paper';

import type { JSX } from 'react';

import { useProps } from '../styles/hooks';

import type { TStyleProps } from '../styles/constants';

export interface ITextProps extends TextProps<never>, TStyleProps {}

export function Text({ style, ...rest }: ITextProps): JSX.Element {
  const { props, styleProps } = useProps(rest);

  return <PaperText {...props} style={[styleProps, style]} />;
}

Text.displayName = 'CustomText';
