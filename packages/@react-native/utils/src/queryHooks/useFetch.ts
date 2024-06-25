import { useRef } from 'react';
import { isNullish, isDate, isPlainObject } from 'remeda';
import {
  useQuery,
  useQueryClient,
  type QueryClient,
  type UseQueryResult,
  type InitialDataFunction,
} from '@tanstack/react-query';

import { useSetData } from './hooks';

import type {
  TOptions,
  TAsyncFunc,
  IErrorProps,
  TQueryKeyParams,
} from './interface';

export type TUseFetchReturn<
  TQueryFnData = unknown,
  TDefaultValue = unknown,
  TQueryFn extends TAsyncFunc<TQueryFnData> = TAsyncFunc<TQueryFnData>,
  TData = Awaited<ReturnType<TQueryFn>>,
  TSelect = unknown,
  TError = IErrorProps,
  TQueryKey extends TQueryKeyParams<TData, TQueryFn> = TQueryKeyParams<
    TData,
    TQueryFn
  >,
  TQueryOptions extends TOptions<
    TQueryFn,
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    TSelect
  > = TOptions<TQueryFn, TQueryFnData, TError, TData, TQueryKey, TSelect>,
  TInitialDataOption = TQueryOptions['initialData'],
  TUseQueryResult = UseQueryResult<TData, TError>,
> = TSelect extends (data: TData) => infer TSelectReturn
  ? TInitialDataOption extends TSelectReturn
    ? Omit<TUseQueryResult, 'data'> & {
        data: TSelectReturn;
        setData: (func: (data: TSelectReturn) => TSelectReturn) => void;
      }
    : TInitialDataOption extends Partial<TSelectReturn>
      ? Omit<TUseQueryResult, 'data'> & {
          data: TSelectReturn;
          setData: (func: (data: TSelectReturn) => TSelectReturn) => void;
        }
      : TDefaultValue extends undefined
        ? Omit<TUseQueryResult, 'data'> & {
            data?: TSelectReturn;
            setData: (func: (data: TSelectReturn) => TSelectReturn) => void;
          }
        : Omit<TUseQueryResult, 'data'> & {
            data: TSelectReturn;
            setData: (func: (data: TSelectReturn) => TSelectReturn) => void;
          }
  : TInitialDataOption extends Partial<TData>
    ? Omit<TUseQueryResult, 'data'> & {
        data: TData;
        setData: (func: (data: TData) => TData) => void;
      }
    : TInitialDataOption extends () => TData
      ? Omit<TUseQueryResult, 'data'> & {
          data: TData;
          setData: (func: (data: TData) => TData) => void;
        }
      : TInitialDataOption extends () => Partial<TData>
        ? Omit<TUseQueryResult, 'data'> & {
            data: TData;
            setData: (func: (data: TData) => TData) => void;
          }
        : TUseQueryResult & {
            setData: (func: (data: TData) => TData) => void;
          };

export function useFetch<
  TQueryFnData = unknown,
  TError = IErrorProps,
  TQueryFn extends TAsyncFunc<TQueryFnData> = TAsyncFunc<TQueryFnData>,
  TData = Awaited<ReturnType<TQueryFn>>,
  TSelectParam = TData,
  TSelect = (data: TSelectParam) => TData,
  TDefaultValue =
    | (TSelect extends (data: TSelectParam) => infer TSelectReturn
        ? TSelectReturn
        : TData)
    | undefined,
  TQueryKey extends TQueryKeyParams<TData, TQueryFn> = TQueryKeyParams<
    TData,
    TQueryFn
  >,
  TQueryOptions extends TOptions<
    TQueryFn,
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    TSelect
  > = TOptions<TQueryFn, TQueryFnData, TError, TData, TQueryKey, TSelect>,
  TInitialDataOption = TQueryOptions['initialData'],
  TUseQueryResult = UseQueryResult<TData, TError>,
>(
  queryFn: TQueryFn,
  key: TQueryKey,
  options: TQueryOptions = {} as TQueryOptions,
  additionalOptions: {
    select?: TSelect;
    defaultValue?: TDefaultValue;
  } = {},
  queryClient?: QueryClient,
): TUseFetchReturn<
  TQueryFnData,
  TDefaultValue,
  TQueryFn,
  TData,
  TSelect,
  TError,
  TQueryKey,
  TQueryOptions,
  TInitialDataOption,
  TUseQueryResult
> {
  const { select, defaultValue } = additionalOptions;
  const defaultValueRef = useRef(defaultValue);
  const qClient = useQueryClient();
  const selectedClient = queryClient || qClient;
  const { initialData, ...opts } = options;

  const setData = useSetData<TData>({
    queryKey: key,
    queryClient: selectedClient,
  });

  const { data, ...methods } = useQuery({
    queryKey: key,
    queryFn: ({ queryKey, signal }) => {
      const params = ((queryKey as unknown as [string, []])[1] || []) as TAny[];

      if (params.length) {
        params.forEach((param) => {
          if (
            !isDate(param) &&
            !Array.isArray(param) &&
            !isNullish(param) &&
            isPlainObject(param)
          ) {
            (param as TAny).signal = signal;
          }
        });
      } else {
        params.push({ signal });
      }

      return queryFn(...params);
    },
    retry: false,
    refetchOnWindowFocus: false,
    select: select as (data: TQueryFnData) => TData,
    initialData: initialData as
      | TQueryFnData
      | InitialDataFunction<TQueryFnData>,
    ...opts,
  });

  return {
    ...methods,
    setData,
    data: data || defaultValueRef.current,
  } as unknown as TUseFetchReturn<
    TQueryFnData,
    TDefaultValue,
    TQueryFn,
    TData,
    TSelect,
    TError,
    TQueryKey,
    TQueryOptions,
    TInitialDataOption,
    TUseQueryResult
  >;
}
