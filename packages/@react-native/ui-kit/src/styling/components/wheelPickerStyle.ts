import { createMultiStyleConfigHelpers } from '../utils';

import type { IViewStyleProps } from '../styles';

export type TWheelPickerPartsProps = {
  container: IViewStyleProps;
  highlightWrapper: IViewStyleProps;
};

const { definePartStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers<TWheelPickerPartsProps>([
    'container',
    'highlightWrapper',
  ]);

export const wheelPickerStyle = defineMultiStyleConfig({
  style: {
    container: definePartStyle<'container'>({
      flex: 1,
      overflow: 'hidden',
    }),
    highlightWrapper: definePartStyle<'highlightWrapper'>({
      w: '100%',
      pos: 'absolute',
      borderRadius: 14,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      bgColor: 'gray.200',
      borderColor: 'gray.200',
    }),
  },
});
