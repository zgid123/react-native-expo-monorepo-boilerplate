/* eslint-disable @typescript-eslint/ban-types */
import type {
  UseQueryOptions,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

export type TQueryKey = `qk_${string}`;
export type TMutationKey = `mk_${string}`;

type Primitive =
  | string
  | Function
  | number
  | boolean
  | Symbol
  | undefined
  | null;

type DeepOmitHelper<T, K extends keyof T> = {
  [P in K]: T[P] extends infer TP //extra level of indirection needed to trigger homomorhic behavior // distribute over unions
    ? TP extends Primitive
      ? TP // leave primitives and functions alone
      : TP extends TAny[]
        ? DeepOmitArray<TP, K> // Array special handling
        : DeepOmit<TP, K>
    : never;
};

type DeepOmit<T, K> = T extends Primitive
  ? T
  : DeepOmitHelper<T, Exclude<keyof T, K>>;

type DeepOmitArray<T extends TAny[], K> = {
  [P in keyof T]: DeepOmit<T[P], K>;
};

export type TAsyncFunc<T> = (...params: TAny[]) => Promise<T>;

export type TFunc<TData, TVariables> = (data: TVariables) => TData;

export type TQueryKeyParams<
  T,
  P extends TAsyncFunc<unknown> = TAsyncFunc<T>,
  TParams extends DeepOmitArray<Parameters<P>, 'signal'> = DeepOmitArray<
    Parameters<P>,
    'signal'
  >,
> = [string, TParams];

export type TIsUnknownOrAny<T> = T extends boolean | {}
  ? false
  : boolean extends boolean & T
    ? true
    : false;

export interface IErrorProps {
  name: string;
  code: number;
  status: number;
  detail: string;
  message: string;
  isNetworkError: boolean;
}

export type TInitialData<TData> = Partial<TData> | (() => Partial<TData>);

export type TOptions<
  TQueryFn extends TAsyncFunc<TQueryFnData>,
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends TQueryKeyParams<TData, TQueryFn>,
  TSelect = unknown,
  TUseQueryOptions extends UseQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  > = UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
> = Omit<
  TUseQueryOptions,
  'queryKey' | 'queryFn' | 'initialData' | 'select'
> & {
  initialData?: TSelect extends (data: TData) => infer TSelectReturn
    ? TSelectReturn
    : TInitialData<TData>;
};

export type TSuspenseOptions<
  TQueryFn extends TAsyncFunc<TQueryFnData>,
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends TQueryKeyParams<TData, TQueryFn>,
  TSelect = unknown,
  TUseSuspenseQueryOptions extends UseSuspenseQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  > = UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
> = Omit<
  TUseSuspenseQueryOptions,
  'queryKey' | 'queryFn' | 'initialData' | 'select'
> & {
  initialData?: TSelect extends (data: TData) => infer TSelectReturn
    ? TSelectReturn
    : TInitialData<TData>;
};
