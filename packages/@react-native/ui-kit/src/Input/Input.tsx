import { TextInput, type TextInputProps } from 'react-native';
import { forwardRef, type JSX, type ReactNode, type LegacyRef } from 'react';

import { Show } from '../Show';
import { HStack, Stack, type IStackProps } from '../Stack';
import { useColor, useMultiStyleConfig, useProps } from '../hooks';

import type { TColors } from '../ThemeProvider';
import type { ITextStyleProps, IViewStyleProps } from '../styling/styles';
import type {
  TInputVariants,
  TInputPartsProps,
} from '../styling/components/inputStyle';

export interface IInputProps
  extends Omit<
      TextInputProps,
      | keyof IViewStyleProps
      | keyof ITextStyleProps
      | 'onChange'
      | 'onChangeText'
      | 'placeholderTextColor'
    >,
    IViewStyleProps,
    ITextStyleProps {
  disabled?: boolean;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  variant?: TInputVariants;
  placeholderTextColor?: TColors;
  onChange?: TextInputProps['onChangeText'];
  iconContainerProps?: Omit<IStackProps, 'style'>;
}

function InputRender(
  {
    style,
    variant,
    onChange,
    leftElement,
    rightElement,
    disabled = false,
    iconContainerProps,
    placeholderTextColor = 'gray.500',
    ...rest
  }: IInputProps,
  ref: LegacyRef<TextInput>,
): JSX.Element {
  const placeholderColor = useColor(placeholderTextColor);
  const { props, viewStyleProps, textStyleProps } = useProps(rest);

  const { container, field, icon } = useMultiStyleConfig<TInputPartsProps>(
    'Input',
    {
      variant,
      disabled,
    },
  );

  return (
    <HStack style={[container.viewStyleProps, viewStyleProps, style]}>
      <Show when={!!leftElement}>
        <Stack
          alignItems='center'
          justifyContent='center'
          style={icon.viewStyleProps}
          {...iconContainerProps}
        >
          {leftElement}
        </Stack>
      </Show>
      <TextInput
        ref={ref}
        editable={!disabled}
        autoCapitalize='none'
        onChangeText={onChange}
        placeholderTextColor={placeholderColor}
        style={[field.viewStyleProps, field.textStyleProps, textStyleProps]}
        {...props}
      />
      <Show when={!!rightElement}>
        <Stack
          alignItems='center'
          justifyContent='center'
          style={icon.viewStyleProps}
          {...iconContainerProps}
        >
          {rightElement}
        </Stack>
      </Show>
    </HStack>
  );
}

export const Input = forwardRef(InputRender);

Input.displayName = 'UIKitInput';
