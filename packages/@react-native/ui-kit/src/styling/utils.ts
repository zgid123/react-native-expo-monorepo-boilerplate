import type { TTheme } from '../ThemeProvider/theme';
import type { ITextStyleProps, IViewStyleProps, TStyleProps } from './styles';

type TStyleType = 'all' | 'text' | 'view';

export interface IConfigParams {
  theme: TTheme;
  [key: string]: TAny;
}

type TConfigFunc<TConfigStyle, TCustomProps = unknown> = (
  params: IConfigParams & TCustomProps,
) => TConfigStyle;

export interface IStyleConfigProps<
  TStyle extends TStyleType = 'all',
  TVariants extends string = string,
  TSizes extends string = string,
  TCustomProps = unknown,
> {
  variants?: Partial<
    Record<TVariants, TStyleProps | TConfigFunc<TStyleProps, TCustomProps>>
  >;
  sizes?: Partial<
    Record<TVariants, TStyleProps | TConfigFunc<TStyleProps, TCustomProps>>
  >;
  style: TStyle extends 'text'
    ? ITextStyleProps | TConfigFunc<ITextStyleProps, TCustomProps>
    : TStyle extends 'view'
      ? IViewStyleProps | TConfigFunc<IViewStyleProps, TCustomProps>
      : TStyleProps | TConfigFunc<TStyleProps, TCustomProps>;
  default?: {
    size?: TSizes;
    variant?: TVariants;
  };
}

export function defineStyleConfig<
  TStyle extends TStyleType = 'all',
  TVariants extends string = string,
  TSizes extends string = string,
  TCustomProps = unknown,
>(
  config:
    | IStyleConfigProps<TStyle, TVariants, TSizes, TCustomProps>
    | TConfigFunc<IStyleConfigProps<TStyle, TVariants, TSizes, TCustomProps>>,
):
  | IStyleConfigProps<TStyle, TVariants, TSizes, TCustomProps>
  | TConfigFunc<IStyleConfigProps<TStyle, TVariants, TSizes, TCustomProps>> {
  return config;
}

export interface IMultiStyleConfigProps<
  TParts extends string,
  TStyles = Record<TParts, TStyleProps>,
  TVariants extends string = string,
  TSizes extends string = string,
  TCustomProps = unknown,
> {
  style: TStyles | TConfigFunc<TStyles, TCustomProps>;
  sizes?: Partial<Record<TSizes, TStyles | TConfigFunc<TStyles, TCustomProps>>>;
  variants?: Partial<
    Record<TVariants, TStyles | TConfigFunc<TStyles, TCustomProps>>
  >;
  default?: {
    size?: TSizes;
    variant?: TVariants;
  };
}

export function createMultiStyleConfigHelpers<
  TStyles extends Record<string, TStyleProps | TConfigFunc<TStyleProps>>,
  TVariants extends string = string,
  TSizes extends string = string,
  TCustomProps = unknown,
  TPartKeys extends keyof TStyles = keyof TStyles,
>(_parts: Array<keyof TStyles>) {
  return {
    definePartStyle<TPart extends keyof TStyles = TPartKeys>(
      config: TStyles[TPart] | TConfigFunc<TStyles[TPart], TCustomProps>,
    ): TStyles[TPart] | TConfigFunc<TStyles[TPart], TCustomProps> {
      return config;
    },
    defineMultiStyleConfig<
      TStyles = Record<TPartKeys, TStyleProps>,
      TKeys extends keyof TStyles = keyof TStyles,
      TConfig = {
        sizes?: Partial<
          Record<TSizes, TStyles | TConfigFunc<TStyles, TCustomProps>>
        >;
        variants?: Partial<
          Record<TVariants, TStyles | TConfigFunc<TStyles, TCustomProps>>
        >;
        style: Partial<
          Record<
            TPartKeys,
            TStyles[TKeys] | TConfigFunc<TStyles[TKeys], TCustomProps>
          >
        >;
        default?: {
          size?: TSizes;
          variant?: TVariants;
        };
      },
    >(config: TConfig | TConfigFunc<TConfig, TCustomProps>) {
      return config;
    },
  };
}

export function hexToRGB(hex: string, alpha = 1): string {
  if (!hex || hex[0] !== '#') {
    return 'transparent';
  }

  const rgb = (
    hex
      .substring(1)
      .match(new RegExp(hex.length === 7 ? '\\w\\w' : '\\w', 'g')) || []
  )
    .map((char: string) => {
      return parseInt(char.padStart(2, char), 16);
    })
    .join(',');

  if (alpha > 1) {
    alpha = alpha / 100;
  }

  return `rgba(${rgb}, ${alpha})`;
}
