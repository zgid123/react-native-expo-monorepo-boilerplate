import { createMultiStyleConfigHelpers } from '../utils';

import type { ITextStyleProps, IViewStyleProps } from '../styles';

export type TInputPartsProps = {
  icon: IViewStyleProps;
  container: IViewStyleProps;
  field: IViewStyleProps & ITextStyleProps;
};

export type TInputVariants = 'outlined' | 'filled';

export interface IInputCustomProps {
  disabled: boolean;
}

const { definePartStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers<
    TInputPartsProps,
    TInputVariants,
    string,
    IInputCustomProps
  >(['icon', 'field', 'container']);

export const inputStyle = defineMultiStyleConfig(({ disabled }) => {
  return {
    style: {
      container: definePartStyle<'container'>({
        h: 45,
        px: 4,
        py: 3.5,
        bgColor: 'white',
        borderRadius: 40,
        alignItems: 'center',
      }),
      field: definePartStyle<'field'>({
        flex: 1,
        w: '100%',
        fontSize: 16,
        opacity: disabled ? 0.5 : 1,
      }),
      icon: definePartStyle<'icon'>({
        w: 24,
        h: 24,
      }),
    },
    variants: {
      outlined: {
        container: definePartStyle<'field'>({
          borderWidth: 1,
          borderColor: 'teal.500',
        }),
      },
    },
    default: {
      variant: 'outlined',
    },
  };
});
