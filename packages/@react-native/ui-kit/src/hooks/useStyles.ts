import { get } from 'react-hook-form';
import { isFunction, pick } from '@core/utils/remeda';

import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import { useThemeContext } from '../ThemeProvider';
import {
  imageStylePropsMapping,
  type IImageStyleProps,
} from '../styling/styles';
import {
  viewStylePropsMapping,
  type IViewStyleProps,
} from '../styling/styles/viewStyle';
import {
  textStylePropsMapping,
  type ITextStyleProps,
} from '../styling/styles/textStyle';
import {
  colorPropsMapping,
  spacingPropsMapping,
} from '../styling/styles/configPropsMapping';

import type {
  TColors,
  TSpacings,
  TComponentsName,
} from '../ThemeProvider/theme';
import type {
  IStyleConfigProps,
  IMultiStyleConfigProps,
} from '../styling/utils';

interface IProps extends IViewStyleProps, ITextStyleProps, IImageStyleProps {
  [key: string]: TAny;
}

interface IUsePropsReturnProps {
  viewStyleProps: ViewStyle;
  textStyleProps: TextStyle;
  imageStyleProps: ImageStyle;
  props: Record<string, TAny>;
}

function mapValue(
  propKey: string,
  value: TAny,
  colors: TColors,
  spacing: TSpacings,
): TAny {
  if (colorPropsMapping[propKey]) {
    return get(colors, value) || value;
  } else if (spacingPropsMapping[propKey]) {
    if (typeof value === 'number' && value < 0) {
      return spacing[Math.abs(value)] * -1 || value;
    } else {
      return spacing[value] || value;
    }
  } else {
    return value;
  }
}

function mapProps(
  props: IProps,
  colors: TColors,
  spacing: TSpacings,
): IUsePropsReturnProps {
  return Object.entries(props).reduce<IUsePropsReturnProps>(
    (acc, element) => {
      const [key, value] = element;

      if (viewStylePropsMapping[key]) {
        const propKey = viewStylePropsMapping[key];
        const val = mapValue(propKey, value, colors, spacing);

        Object.assign(acc.viewStyleProps, {
          [propKey]: val,
        });
      } else if (textStylePropsMapping[key]) {
        const propKey = textStylePropsMapping[key];
        const val = mapValue(propKey, value, colors, spacing);

        Object.assign(acc.textStyleProps, {
          [propKey]: val,
        });
      } else if (imageStylePropsMapping[key]) {
        const propKey = imageStylePropsMapping[key];
        const val = mapValue(propKey, value, colors, spacing);

        Object.assign(acc.imageStyleProps, {
          [propKey]: val,
        });
      } else {
        acc.props[key] = value;
      }

      return acc;
    },
    {
      props: {},
      viewStyleProps: {},
      textStyleProps: {},
      imageStyleProps: {},
    },
  );
}

export function useProps(props: IProps): IUsePropsReturnProps {
  const theme = useThemeContext();
  const { colors, spacing } = theme as unknown as {
    colors: TColors;
    spacing: TSpacings;
  };

  const { imageStyleProps, viewStyleProps, ...rest } = mapProps(
    props,
    colors,
    spacing,
  );

  Object.assign(
    imageStyleProps,
    pick(viewStyleProps, Object.keys(imageStylePropsMapping) as TAny[]),
  );

  return {
    ...rest,
    viewStyleProps,
    imageStyleProps,
  };
}

interface IUseStylePropsProps
  extends IViewStyleProps,
    ITextStyleProps,
    IImageStyleProps {}

export function useStyleProps(
  props: IUseStylePropsProps,
): Omit<IUsePropsReturnProps, 'props'> {
  const { imageStyleProps, textStyleProps, viewStyleProps } = useProps(props);

  return {
    textStyleProps,
    viewStyleProps,
    imageStyleProps,
  };
}

export function useColor(value: TColors): string {
  const theme = useThemeContext();
  const { colors } = theme;

  return get(colors, value as string) || value;
}

interface IUseStyleConfigOptionsProps {
  size?: string;
  variant?: string;
  [key: string]: TAny;
}

interface IUseStyleConfigReturnProps {
  viewStyleProps: ViewStyle;
  textStyleProps: TextStyle;
}

export function useStyleConfig(
  name: TComponentsName,
  opts: IUseStyleConfigOptionsProps = {},
): IUseStyleConfigReturnProps {
  const { variant, size, ...rest } = opts;
  const { components, colors, spacing } = useThemeContext();
  let componentStyleConfig = components[name] as IStyleConfigProps;

  if (isFunction(componentStyleConfig)) {
    componentStyleConfig = componentStyleConfig({
      theme: {
        colors,
        spacing,
      },
      ...(rest as TAny),
    });
  }

  const {
    style,
    sizes = {},
    variants = {},
    default: defaultConfig = {},
  } = componentStyleConfig;

  let styleProps = style;
  let sizeProps = sizes[size || defaultConfig.size] || {};
  let variantProps = variants[variant || defaultConfig.variant] || {};

  if (typeof styleProps === 'function') {
    styleProps = styleProps({
      theme: {
        colors,
        spacing,
      },
      ...rest,
    });
  }

  if (typeof variantProps === 'function') {
    variantProps = variantProps({
      theme: {
        colors,
        spacing,
      },
      ...rest,
    });
  }

  if (typeof sizeProps === 'function') {
    sizeProps = sizeProps({
      theme: {
        colors,
        spacing,
      },
      ...rest,
    });
  }

  const { textStyleProps, viewStyleProps } = useProps({
    ...styleProps,
    ...sizeProps,
    ...variantProps,
    ...rest,
  });

  return {
    textStyleProps,
    viewStyleProps,
  };
}

type TConvertStyleProps<T> = {
  [key in keyof T]: {
    viewStyleProps: ViewStyle;
    textStyleProps: TextStyle;
    imageStyleProps: ImageStyle;
  };
};

export function useMultiStyleConfig<T>(
  name: TComponentsName,
  opts: IUseStyleConfigOptionsProps = {},
): TConvertStyleProps<T> {
  const { variant, size, ...rest } = opts;
  const { components, colors, spacing } = useThemeContext();
  let componentStyleConfig = components[name] as IMultiStyleConfigProps<string>;

  if (isFunction(componentStyleConfig)) {
    componentStyleConfig = componentStyleConfig({
      theme: {
        colors,
        spacing,
      },
      ...(rest as TAny),
    });
  }

  const {
    style,
    sizes = {},
    variants = {},
    default: defaultConfig = {},
  } = componentStyleConfig;

  let sizeProps = sizes[size || defaultConfig.size] || {};
  let variantProps = variants[variant || defaultConfig.variant] || {};

  const result = Object.entries(style).reduce((result, [key, value]) => {
    let size = sizeProps[key] || {};
    let variant = variantProps[key] || {};

    if (typeof value === 'function') {
      value = value({
        theme: {
          colors,
          spacing,
        },
        ...rest,
      });
    }

    if (typeof variant === 'function') {
      variant =
        variant({
          theme: {
            colors,
            spacing,
          },
          ...rest,
        }) || {};
    }

    if (typeof size === 'function') {
      size =
        size({
          theme: {
            colors,
            spacing,
          },
          ...rest,
        }) || {};
    }

    const keyProps = mapProps(
      {
        ...value,
        ...size,
        ...variant,
        ...rest,
      },
      colors as unknown as TColors,
      spacing as unknown as TSpacings,
    );

    result[key] = keyProps;

    return result;
  }, {}) as TConvertStyleProps<T>;

  return result;
}
