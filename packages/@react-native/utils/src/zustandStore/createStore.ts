import { immer } from 'zustand/middleware/immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import {
  persist,
  devtools,
  createJSONStorage,
  type PersistOptions,
  type DevtoolsOptions,
} from 'zustand/middleware';
import {
  create,
  type StoreApi,
  type StateCreator,
  type UseBoundStore,
} from 'zustand';

import type { WithImmer, WithDevtools } from './interface';

type TImmerMiddleware<T = never> = ['zustand/immer', T];

type TPersistMiddleware<T = never> = ['zustand/persist', T];

type TData<T> = StateCreator<T, [TImmerMiddleware]>;

type TImmerStateCreator<T> = StateCreator<T, [], [TImmerMiddleware]>;

type TStoreData<T> =
  | TImmerStateCreator<T>
  | StateCreator<T, [], [TPersistMiddleware<unknown>, TImmerMiddleware]>;

type TCreateStoreReturn<T> = UseBoundStore<
  WithImmer<WithDevtools<WithImmer<WithDevtools<StoreApi<T>>>>>
> & {
  use: {
    [key in keyof Required<T>]: () => T[key];
  };
};

interface IOptionsProps<T = unknown> extends DevtoolsOptions {
  persistOptions?: Omit<PersistOptions<T>, 'storage'>;
}

export function createStore<T = unknown>(
  data: TData<T>,
  options?: IOptionsProps<T>,
): TCreateStoreReturn<T> {
  const { persistOptions, ...rest } = options || {};
  let storeData: TStoreData<T> = immer<T>(data);

  if (persistOptions) {
    storeData = persist(storeData, {
      ...persistOptions,
      storage: createJSONStorage<T>(() => AsyncStorage),
    });
  }

  const store = create(devtools(storeData as TImmerStateCreator<T>, rest));

  return createSelectorFunctions(
    store as UseBoundStore<StoreApi<object>>,
  ) as TCreateStoreReturn<T>;
}
