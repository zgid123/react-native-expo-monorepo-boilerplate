import type { FieldValues, UseFormReset } from 'react-hook-form';

export interface IFormImperativeHandleProps<T extends FieldValues> {
  reset: UseFormReset<T>;
}

export type DeepRequired<T> = {
  [K in keyof T]: Required<DeepRequired<T[K]>>;
};
