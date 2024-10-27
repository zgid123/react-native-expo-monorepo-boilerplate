import { createMultiStyleConfigHelpers } from '../utils';

import type { IViewStyleProps } from '../styles';

export type TCardPartsProps = {
  header: IViewStyleProps;
  content: IViewStyleProps;
  container: IViewStyleProps;
};

const { definePartStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers<TCardPartsProps>([
    'header',
    'content',
    'container',
  ]);

export const cardStyle = defineMultiStyleConfig({
  style: {
    container: definePartStyle<'container'>({
      borderRadius: 8,
      shadowRadius: 8,
      bgColor: 'white',
      shadowOpacity: 0.22,
      shadowColor: 'black',
      justifyContent: 'center',
      shadowOffset: {
        width: 0,
        height: 1,
      },
    }),
    header: definePartStyle<'header'>({
      p: 4,
      borderTopEndRadius: 8,
      borderTopStartRadius: 8,
    }),
    content: definePartStyle<'content'>({
      p: 4,
      borderBottomEndRadius: 8,
      borderBottomStartRadius: 8,
    }),
  },
});
