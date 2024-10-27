import { createMultiStyleConfigHelpers } from '../utils';

import type { IViewStyleProps } from '../styles';

export type TPreloaderPartsProps = {
  container: IViewStyleProps;
};

const { definePartStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers<TPreloaderPartsProps>(['container']);

export const preloaderStyle = defineMultiStyleConfig({
  style: {
    container: definePartStyle<'container'>({
      w: '100%',
      h: '100%',
      pos: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    }),
  },
});
