import {
  useContext as useReactContext,
  createContext as createReactContext,
  type Context,
} from 'react';

interface ICreateContextParams {
  name: string;
}

export function createContext<T>({
  name,
}: ICreateContextParams): [Context<T>['Provider'], () => T, Context<T>] {
  const Context = createReactContext<T>({} as T);

  Context.displayName = name;

  const useContext = () => {
    const context = useReactContext(Context);

    if (!context) {
      // eslint-disable-next-line no-console
      console.log(`use${name} must be used inside ${name}Provider`);
    }

    return context;
  };

  return [Context.Provider, useContext, Context];
}
