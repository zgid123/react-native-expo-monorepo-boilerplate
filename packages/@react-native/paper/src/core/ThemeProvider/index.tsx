import { mergeDeep } from '@core/utils/remeda';
import { PaperProvider } from 'react-native-paper';
import { useCallback, useState, type JSX, type ReactNode } from 'react';

import type { MD3Theme } from 'react-native-paper/lib/typescript/types';

import { theme as defaultTheme, type TTheme } from './v1';
import { ThemeProvider as ThemeContextProvider } from './context';

export * from './context';

export type { TColors } from './v1';

interface IThemeProviderProps {
  theme?: MD3Theme;
  children: ReactNode;
}

export function ThemeProvider({
  children,
  theme: customTheme,
}: IThemeProviderProps): JSX.Element {
  const [theme, setTheme] = useState(
    mergeDeep(defaultTheme, customTheme || {}),
  );

  const override = useCallback((theme: TTheme) => {
    setTheme((state) => {
      return mergeDeep(state, theme);
    });
  }, []);

  const reset = useCallback(() => {
    setTheme(mergeDeep(defaultTheme, customTheme || {}));
  }, [customTheme]);

  return (
    <ThemeContextProvider value={{ reset, override }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContextProvider>
  );
}
