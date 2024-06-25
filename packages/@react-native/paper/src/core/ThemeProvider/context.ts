import { createContext } from '@react-native/utils';

import type { DeepPartial } from 'react-hook-form';

import type { TTheme } from './v1';

interface IThemeContextProps {
  reset: () => void;
  override: (data: DeepPartial<TTheme>) => void;
}

const [ThemeProvider, useThemeContext] = createContext<IThemeContextProps>({
  name: 'ThemeContext',
});

export { ThemeProvider, useThemeContext };
