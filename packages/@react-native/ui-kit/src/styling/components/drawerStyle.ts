import { createMultiStyleConfigHelpers } from '../utils';

import type { IViewStyleProps } from '../styles';

export type TDrawerPartsProps = {
  modal: IViewStyleProps;
  container: IViewStyleProps;
  innerContainer: IViewStyleProps;
  titleContainer: IViewStyleProps;
  contentContainer: IViewStyleProps;
};

const { definePartStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers<TDrawerPartsProps>([
    'modal',
    'container',
    'innerContainer',
    'titleContainer',
    'contentContainer',
  ]);

export const drawerStyle = defineMultiStyleConfig({
  style: {
    modal: definePartStyle<'modal'>({
      m: 0,
      mr: 7,
    }),
    container: definePartStyle<'container'>({
      h: '100%',
      bgColor: 'white',
    }),
    innerContainer: definePartStyle<'innerContainer'>({
      flex: 1,
      w: '100%',
      h: '100%',
    }),
    titleContainer: definePartStyle<'titleContainer'>({
      px: 4,
      alignItems: 'center',
      justifyContent: 'flex-end',
    }),
    contentContainer: definePartStyle<'contentContainer'>({
      p: 4,
      flex: 1,
    }),
  },
});
