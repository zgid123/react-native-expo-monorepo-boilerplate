import { createMultiStyleConfigHelpers } from '../utils';

import type { ITextStyleProps, IViewStyleProps } from '../styles';

export type TButtonVariants = 'solid' | 'icon' | 'ghost';

export type TButtonPartsProps = {
  text: ITextStyleProps;
  container: IViewStyleProps;
};

export interface IButtonCustomProps {
  disabled: boolean;
  isLoading: boolean;
}

const { definePartStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers<
    TButtonPartsProps,
    TButtonVariants,
    string,
    IButtonCustomProps
  >(['text', 'container']);

export const buttonStyle = defineMultiStyleConfig({
  style: {
    container: definePartStyle<'container'>(({ isLoading, disabled }) => {
      return {
        px: 5,
        minH: 40,
        display: 'flex',
        borderRadius: 7,
        bgColor: 'teal.500',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isLoading || disabled ? 0.5 : 1,
      };
    }),
    text: definePartStyle<'text'>({
      color: 'white',
    }),
  },
  variants: {
    icon: {
      container: definePartStyle<'container'>({
        px: 0,
        bgColor: 'transparent',
      }),
      text: {},
    },
    ghost: {
      container: definePartStyle<'container'>({
        bgColor: 'transparent',
      }),
      text: definePartStyle<'text'>({
        color: 'black',
      }),
    },
  },
  default: {
    variant: 'solid',
  },
});
