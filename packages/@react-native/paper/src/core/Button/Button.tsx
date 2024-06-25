import { Button as PaperButton, type ButtonProps } from 'react-native-paper';

import type { JSX } from 'react';
import type { TextStyle } from 'react-native';

import { useColor, useProps, useStyleProps } from '../styles/hooks';

import type {
  TViewStyleKeys,
  ITextStyleProps,
  TViewStyleProps,
  ISpacingStyleProps,
} from '../styles/constants';

export interface IButtonProps
  extends Omit<ButtonProps, TViewStyleKeys | 'labelStyle'>,
    TViewStyleProps {
  labelStyle?: ITextStyleProps | ISpacingStyleProps;
}

export function Button({
  style,
  theme,
  loading,
  disabled,
  labelStyle,
  mode = 'contained',
  ...rest
}: IButtonProps): JSX.Element {
  const { props, styleProps } = useProps(rest);

  const defaultStyles = useStyleProps({
    borderRadius: 7,
  });

  const defaultLabelStyles = useStyleProps<TextStyle>(labelStyle);

  const primaryColor = useColor('white');
  const onPrimaryColor = useColor('black');

  return (
    <PaperButton
      mode={mode}
      loading={loading}
      disabled={loading || disabled}
      labelStyle={defaultLabelStyles}
      style={[defaultStyles, styleProps, style]}
      theme={{
        ...theme,
        colors: {
          primary: primaryColor,
          onPrimary: onPrimaryColor,
          ...theme?.colors,
        },
      }}
      {...props}
    />
  );
}

Button.displayName = 'CustomButton';
