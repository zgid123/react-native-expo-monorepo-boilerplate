import { TextInput, type TextInputProps } from 'react-native-paper';
import { forwardRef, type JSX, type ForwardedRef, type ReactNode } from 'react';

import { useProps } from '../styles/hooks';
import { useDefaultStyles, useOutlineDefaultStyles } from './hooks';

import type { TViewStyleKeys, TViewStyleProps } from '../styles/constants';

export interface IInputProps
  extends Omit<TextInputProps, TViewStyleKeys | 'onChange' | 'onChangeText'>,
    TViewStyleProps {
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  onChange?: TextInputProps['onChangeText'];
}

function InputRender(
  {
    style,
    onChange,
    leftElement,
    outlineStyle,
    rightElement,
    mode = 'outlined',
    ...rest
  }: IInputProps,
  ref: ForwardedRef<TextInputProps>,
): JSX.Element {
  const { props, styleProps } = useProps(rest);
  const defaultStyles = useDefaultStyles();
  const outlineDefaultStyles = useOutlineDefaultStyles();

  return (
    <TextInput
      {...props}
      ref={ref}
      mode={mode}
      left={leftElement}
      right={rightElement}
      onChangeText={onChange}
      style={[defaultStyles, styleProps, style]}
      outlineStyle={[outlineDefaultStyles, outlineStyle]}
    />
  );
}

export const Input = forwardRef(InputRender);

Input.displayName = 'CustomInput';
