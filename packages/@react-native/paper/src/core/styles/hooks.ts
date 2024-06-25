import { get } from 'react-hook-form';
import { useTheme } from 'react-native-paper';

import type { ViewStyle } from 'react-native';

import {
  colorPropsMapping,
  stylePropsMapping,
  spacePropsMapping,
  type TStyleKeys,
  type TStyleProps,
  type TViewStyleProps,
  type ITextStyleProps,
  type ISpacingStyleProps,
} from './constants';

import type { TColors, TTheme } from '../ThemeProvider/v1';

interface IUsePropsReturnProps {
  props: TAny;
  styleProps: TStyleProps;
}

export function useProps(props: TAny): IUsePropsReturnProps {
  const theme = useTheme<TTheme>();
  const { colors, spacing } = theme;

  return Object.entries(props).reduce<IUsePropsReturnProps>(
    (acc, element) => {
      const [key, value] = element as [TStyleKeys, TAny];

      if (stylePropsMapping[key]) {
        const propKey: keyof TStyleProps = stylePropsMapping[key];
        let val = value;

        if (colorPropsMapping[propKey] || propKey === 'color') {
          val = get(colors, value) || value;
        } else if (spacePropsMapping[propKey as keyof ISpacingStyleProps]) {
          if (typeof value === 'number' && value < 0) {
            val = spacing[Math.abs(value)] * -1 || value;
          } else {
            val = spacing[value] || value;
          }
        } else {
          val = value;
        }

        Object.assign(acc.styleProps, {
          [propKey]: val,
        });
      } else {
        acc.props[key] = value;
      }

      return acc;
    },
    {
      props: {},
      styleProps: {},
    },
  );
}

export function useStyleProps<T extends ViewStyle>(
  props: TViewStyleProps | ITextStyleProps = {},
): T {
  const { styleProps } = useProps(props);

  return styleProps as T;
}

export function useExtractedStyleProps<T>(props: T): T {
  const { props: componentProps } = useProps(props);

  return componentProps;
}

export function useColor(value: TColors): string {
  const theme = useTheme<TTheme>();
  const { colors } = theme;

  return get(colors, value as string) || value;
}
