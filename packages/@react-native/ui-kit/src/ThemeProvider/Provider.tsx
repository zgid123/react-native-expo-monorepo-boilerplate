import { mergeDeep } from '@core/utils/remeda';
import { useCallback, useState, type JSX, type ReactNode } from 'react';

import { ThemeProvider } from './context';
import { theme as defaultTheme, type TComponents, type TTheme } from './theme';

interface IUIKitProviderProps {
  theme?: TTheme;
  children: ReactNode;
}

export function UIKitProvider({
  children,
  theme: customTheme,
}: IUIKitProviderProps): JSX.Element {
  const [theme, setTheme] = useState<
    Omit<typeof defaultTheme, 'components'> & { components: TComponents }
  >(mergeDeep(defaultTheme, customTheme || {}));

  const override = useCallback((theme: TTheme) => {
    setTheme((state) => {
      return mergeDeep(state, theme);
    });
  }, []);

  const reset = useCallback(() => {
    setTheme(mergeDeep(defaultTheme, customTheme || {}));
  }, [customTheme]);

  return (
    <ThemeProvider
      value={{
        reset,
        override,
        ...theme,
      }}
    >
      {children}
    </ThemeProvider>
  );
}

UIKitProvider.displayName = 'UIKitProvider';
