import {
  useMutation,
  type MutationFunction,
  type UseMutationResult,
  type UseMutationOptions,
} from '@tanstack/react-query';

import type { IErrorProps } from './interface';

export const useRequest = <
  TData = unknown,
  TVariables = void,
  TContext = unknown,
>(
  mutationFunc: MutationFunction<TData, TVariables>,
  options?: Omit<
    UseMutationOptions<TData, IErrorProps, TVariables, TContext>,
    'mutationFn'
  >,
): UseMutationResult<TData, IErrorProps, TVariables, TContext> => {
  return useMutation({ ...options, mutationFn: mutationFunc });
};
