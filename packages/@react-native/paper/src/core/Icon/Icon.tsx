import { Icon as PaperIcon } from 'react-native-paper';

import type { JSX } from 'react';
import type { ThemeProp } from 'react-native-paper/lib/typescript/types';

import { useColor } from '../styles/hooks';

import type { TColors } from '../ThemeProvider/v1';

export interface IIconProps {
  size: number;
  source: string;
  color?: TColors;
  theme?: ThemeProp;
  allowFontScaling?: boolean;
}

export function Icon({ color, ...rest }: IIconProps): JSX.Element {
  const colorCode = useColor(color);

  return <PaperIcon {...rest} color={colorCode} />;
}

Icon.displayName = 'CustomIcon';
