import { ActivityIndicator } from 'react-native';

import type { JSX } from 'react';

import { Show } from '../Show';
import { Text } from '../Text';
import { HStack } from '../Stack';
import { useMultiStyleConfig, useProps } from '../hooks';
import {
  TouchableOpacity,
  type ITouchableOpacityProps,
} from '../TouchableOpacity';

import type { ITextStyleProps, IViewStyleProps } from '../styling/styles';
import type { TButtonPartsProps, TButtonVariants } from '../styling/components';

export interface IButtonProps
  extends ITouchableOpacityProps,
    IViewStyleProps,
    ITextStyleProps {
  isLoading?: boolean;
  variant?: TButtonVariants;
  loadingText?: false | string;
}

export function Button({
  style,
  variant,
  children,
  isLoading,
  loadingText,
  ...rest
}: IButtonProps): JSX.Element {
  const { props, viewStyleProps, textStyleProps } = useProps({
    ...rest,
  });

  const { container, text } = useMultiStyleConfig<TButtonPartsProps>('Button', {
    ...rest,
    variant,
    isLoading,
  });

  return (
    <TouchableOpacity
      disabled={isLoading}
      style={[container.viewStyleProps, viewStyleProps, style]}
      {...props}
    >
      <HStack spacing={4}>
        <Show when={isLoading}>
          <ActivityIndicator
            animating
            size='small'
            color={textStyleProps.color || text.textStyleProps.color || 'black'}
          />
        </Show>
        <Show when={isLoading && loadingText !== false}>
          <Text style={[textStyleProps, text.textStyleProps]}>
            {loadingText || children}
          </Text>
        </Show>
        <Show when={!isLoading}>
          <Text style={[textStyleProps, text.textStyleProps]}>{children}</Text>
        </Show>
      </HStack>
    </TouchableOpacity>
  );
}

Button.displayName = 'UIKitButton';
