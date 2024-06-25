import type {
  Validate,
  FieldPath,
  FieldValues,
  FieldPathValue,
} from 'react-hook-form';

export function required<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  message = 'Required',
): Validate<FieldPathValue<TFieldValues, TFieldName>, TFieldValues> {
  return (value: string | Record<string, unknown> | null): string | true => {
    if (typeof value === 'number') {
      value = (value as number).toString();
    }

    if (value === null) {
      value = '';
    }

    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    return !!value?.trim?.() || message;
  };
}

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface IRuleOptions {
  message?: string;
  allowEmpty?: boolean;
}

export function email<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  opts: IRuleOptions = {},
): Validate<FieldPathValue<TFieldValues, TFieldName>, TFieldValues> {
  const { allowEmpty, message = 'Email address is invalid' } = opts;

  return (value: string): string | true => {
    if (allowEmpty && !value) {
      return true;
    }

    return emailRegex.test(value) || message;
  };
}
