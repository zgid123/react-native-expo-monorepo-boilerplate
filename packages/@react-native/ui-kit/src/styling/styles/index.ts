import type { ITextStyleProps } from './textStyle';
import type { IViewStyleProps } from './viewStyle';
import type { IImageStyleProps } from './imageStyle';

export * from './configPropsMapping';
export * from './imageStyle';
export * from './textStyle';
export * from './viewStyle';

export type TStyleProps = IViewStyleProps & ITextStyleProps & IImageStyleProps;
