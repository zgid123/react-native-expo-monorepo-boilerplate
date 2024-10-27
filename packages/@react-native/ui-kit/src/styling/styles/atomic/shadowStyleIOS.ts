import type { ShadowStyleIOS } from 'react-native';

import type { TColors } from '../../../ThemeProvider/theme';

export interface IShadowStyleIOSColorProps {
  shadowColor?: TColors;
}

export interface IShadowStyleIOSProps
  extends Omit<ShadowStyleIOS, keyof IShadowStyleIOSColorProps>,
    IShadowStyleIOSColorProps {}

export const shadowStyleIOSPropsMapping: Record<
  keyof IShadowStyleIOSProps,
  keyof ShadowStyleIOS
> = {
  shadowColor: 'shadowColor',
  shadowOffset: 'shadowOffset',
  shadowOpacity: 'shadowOpacity',
  shadowRadius: 'shadowRadius',
};
