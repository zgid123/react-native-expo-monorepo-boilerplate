import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from 'react-hook-form';
import {
  cloneElement,
  createElement,
  isValidElement,
  type JSX,
  type ReactElement,
  type ComponentType,
} from 'react';

import { Show } from '../Show';
import { Text } from '../Text';
import { Stack, type IStackProps } from '../Stack';
import { Input, type IInputProps } from '../Input';

import type { AsProps } from '../interface';

type TComponent = ReactElement | ComponentType<TAny>;

interface IFormInputProps<
  T extends undefined | TComponent,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  label?: string;
  shouldUnregister?: boolean;
  component?: T | typeof Input;
  containerProps?: IStackProps;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TAny, TAny>;
}

export function FormInput<
  T extends undefined | TComponent,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  rules,
  label,
  control,
  disabled,
  defaultValue,
  containerProps,
  component = Input,
  shouldUnregister = false,
  onChange: onExternalChange,
  ...rest
}: IFormInputProps<T, TFieldValues, TName> &
  AsProps<T, IInputProps>): JSX.Element {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
    disabled,
    shouldUnregister,
    defaultValue: defaultValue as TAny,
  });

  const { error } = fieldState;
  const { onChange: onInternalChange, ...fieldRest } = field;
  const isValid = isValidElement(component);

  const onChange: typeof onInternalChange = (event: TAny) => {
    onInternalChange(event);
    onExternalChange?.(event);
  };

  const props: IInputProps = {
    ...rest,
    ...fieldRest,
    onChange,
    error: error?.message,
  };

  return (
    <Stack w='100%' pos='relative' {...containerProps}>
      <Show when={!!label}>
        <Text>{label}</Text>
      </Show>
      {isValid
        ? cloneElement(component, props)
        : createElement(component as ComponentType<TAny>, props)}
    </Stack>
  );
}

FormInput.displayName = 'CustomFormInput';
