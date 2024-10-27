import { createContext } from '@react-native/utils';

import type { DeepPartial } from 'react-hook-form';

import type { TComponents, TTheme } from './theme';

interface IThemeContextProps extends TTheme {
  reset: () => void;
  components: TComponents;
  override: (data: DeepPartial<TTheme>) => void;
}

const [ThemeProvider, useThemeContext] = createContext<IThemeContextProps>({
  name: 'ThemeContext',
});

export { ThemeProvider, useThemeContext };
