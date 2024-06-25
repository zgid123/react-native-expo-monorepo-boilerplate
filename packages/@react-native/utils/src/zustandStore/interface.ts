import type { Draft } from 'immer';
import type {
  Mutate,
  StoreApi,
  StateCreator,
  UseBoundStore,
  StoreMutatorIdentifier,
} from 'zustand';

type Write<T, U> = Omit<T, keyof U> & U;

type SkipTwo<T> = T extends {
  length: 0;
}
  ? []
  : T extends {
        length: 1;
      }
    ? []
    : T extends {
          length: 0 | 1;
        }
      ? []
      : T extends [unknown, unknown, ...infer A]
        ? A
        : T extends [unknown, unknown?, ...infer A]
          ? A
          : T extends [unknown?, unknown?, ...infer A]
            ? A
            : never;

type StoreImmer<S> = S extends {
  getState: () => infer T;
  setState: infer SetState;
}
  ? SetState extends (...a: infer A) => infer Sr
    ? {
        setState(
          nextStateOrUpdater: T | Partial<T> | ((state: Draft<T>) => void),
          shouldReplace?: boolean | undefined,
          ...a: SkipTwo<A>
        ): Sr;
      }
    : never
  : never;

export type WithImmer<S> = Write<S, StoreImmer<S>>;

export type Create = {
  <T, Mos extends [StoreMutatorIdentifier, unknown][] = []>(
    initializer: StateCreator<T, [], Mos>,
  ): UseBoundStore<Mutate<StoreApi<T>, Mos>>;
  <T>(): <Mos extends [StoreMutatorIdentifier, unknown][] = []>(
    initializer: StateCreator<T, [], Mos>,
  ) => UseBoundStore<Mutate<StoreApi<T>, Mos>>;
  <S extends StoreApi<unknown>>(store: S): UseBoundStore<S>;
};

type Cast<T, U> = T extends U ? T : U;

type TakeTwo<T> = T extends {
  length: 0;
}
  ? [undefined, undefined]
  : T extends {
        length: 1;
      }
    ? [...a0: Cast<T, unknown[]>, a1: undefined]
    : T extends {
          length: 0 | 1;
        }
      ? [...a0: Cast<T, unknown[]>, a1: undefined]
      : T extends {
            length: 2;
          }
        ? T
        : T extends {
              length: 1 | 2;
            }
          ? T
          : T extends {
                length: 0 | 1 | 2;
              }
            ? T
            : T extends [infer A0, infer A1, ...unknown[]]
              ? [A0, A1]
              : T extends [infer A0, (infer A1)?, ...unknown[]]
                ? [A0, A1?]
                : T extends [(infer A0)?, (infer A1)?, ...unknown[]]
                  ? [A0?, A1?]
                  : never;

type StoreDevtools<S> = S extends {
  setState: (...a: infer Sa) => infer Sr;
}
  ? {
      setState<
        A extends
          | string
          | {
              type: unknown;
            },
      >(
        ...a: [...a: TakeTwo<Sa>, action?: A]
      ): Sr;
    }
  : never;

export type WithDevtools<S> = Write<S, StoreDevtools<S>>;
