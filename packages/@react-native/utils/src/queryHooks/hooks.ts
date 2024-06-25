import { produce } from 'immer';
import { useCallback } from 'react';
import {
  useQueryClient,
  type QueryKey,
  type QueryClient,
} from '@tanstack/react-query';

interface IUseSetDataParams {
  queryKey: QueryKey;
  queryClient?: QueryClient;
}

export function useSetData<
  TData,
  TSelectParam = TData,
  TSelect = (data: TSelectParam) => TData,
  TFuncData = TSelect extends (data: TSelectParam) => infer TSelectReturn
    ? TSelectReturn
    : TData,
  TFuncReturn = TSelect extends (data: TSelectParam) => infer TSelectReturn
    ? TSelectReturn
    : TData,
>({
  queryKey,
  queryClient,
}: IUseSetDataParams): (func: (data: TFuncData) => TFuncReturn) => void {
  const qClient = useQueryClient();
  const selectedClient = queryClient || qClient;

  return useCallback(
    (func: (data: TFuncData) => TFuncReturn) => {
      selectedClient.setQueryData(
        queryKey,
        produce((data: TAny) => {
          return func(data);
        }),
      );
    },
    [queryKey, selectedClient],
  );
}
