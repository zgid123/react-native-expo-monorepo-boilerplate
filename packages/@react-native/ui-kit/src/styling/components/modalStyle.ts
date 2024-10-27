import { createMultiStyleConfigHelpers } from '../utils';

import type { IViewStyleProps } from '../styles';

export type TModalPartsProps = {
  container: IViewStyleProps;
  innerContainer: IViewStyleProps;
};

const { definePartStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers<TModalPartsProps>([
    'container',
    'innerContainer',
  ]);

export const modalStyle = defineMultiStyleConfig({
  style: {
    container: definePartStyle<'container'>({
      p: 0,
    }),
    innerContainer: definePartStyle<'innerContainer'>({
      p: 4,
      borderRadius: 8,
      bgColor: 'white',
    }),
  },
});
