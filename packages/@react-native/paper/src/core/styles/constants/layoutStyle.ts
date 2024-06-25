import type {
  MaximumOneOf,
  DimensionValue,
  ScaleTransform,
  SkewXTransform,
  SkewYTransform,
  MatrixTransform,
  RotateTransform,
  ScaleXTransform,
  ScaleYTransform,
  RotateXTransform,
  RotateYTransform,
  RotateZTransform,
  TranslateXTransform,
  TranslateYTransform,
  PerspectiveTransform,
  AnimatableNumericValue,
} from 'react-native';

import type { TColors } from '../../ThemeProvider/v1';

type TPosition = 'absolute' | 'relative' | 'sticky';

export interface ILayoutStyleProps {
  aspectRatio?: number | string;
  backfaceVisibility?: 'visible' | 'hidden';
  backgroundColor?: TColors;
  bg?: TColors;
  bgColor?: TColors;
  bottom?: DimensionValue;
  display?: 'flex' | 'none';
  elevation?: number;
  end?: DimensionValue;
  h?: DimensionValue;
  height?: DimensionValue;
  left?: DimensionValue;
  maxH?: DimensionValue;
  maxHeight?: DimensionValue;
  maxW?: DimensionValue;
  maxWidth?: DimensionValue;
  minH?: DimensionValue;
  minHeight?: DimensionValue;
  minW?: DimensionValue;
  minWidth?: DimensionValue;
  opacity?: number;
  overflow?: 'visible' | 'hidden' | 'scroll';
  pointerEvents?: 'auto' | 'none';
  pos?: TPosition;
  position?: TPosition;
  right?: DimensionValue;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  start?: DimensionValue;
  top?: DimensionValue;
  transform?:
    | MaximumOneOf<
        PerspectiveTransform &
          RotateTransform &
          RotateXTransform &
          RotateYTransform &
          RotateZTransform &
          ScaleTransform &
          ScaleXTransform &
          ScaleYTransform &
          TranslateXTransform &
          TranslateYTransform &
          SkewXTransform &
          SkewYTransform &
          MatrixTransform
      >[]
    | string;
  transformMatrix?: Array<number>;
  transformOrigin?: Array<string | number> | string;
  translateX?: AnimatableNumericValue;
  translateY?: AnimatableNumericValue;
  w?: DimensionValue;
  width?: DimensionValue;
  zIndex?: number;
}

export const layoutPropsMapping: Record<
  keyof ILayoutStyleProps,
  keyof ILayoutStyleProps
> = {
  aspectRatio: 'aspectRatio',
  backfaceVisibility: 'backfaceVisibility',
  backgroundColor: 'backgroundColor',
  bg: 'backgroundColor',
  bgColor: 'backgroundColor',
  bottom: 'bottom',
  display: 'display',
  elevation: 'elevation',
  end: 'end',
  h: 'height',
  height: 'height',
  left: 'left',
  maxH: 'maxHeight',
  maxHeight: 'maxHeight',
  maxW: 'maxWidth',
  maxWidth: 'maxWidth',
  minH: 'minHeight',
  minHeight: 'minHeight',
  minW: 'minWidth',
  minWidth: 'minWidth',
  opacity: 'opacity',
  overflow: 'overflow',
  pointerEvents: 'pointerEvents',
  pos: 'position',
  position: 'position',
  right: 'right',
  rotation: 'rotation',
  scaleX: 'scaleX',
  scaleY: 'scaleY',
  shadowColor: 'shadowColor',
  shadowOffset: 'shadowOffset',
  shadowOpacity: 'shadowOpacity',
  shadowRadius: 'shadowRadius',
  start: 'start',
  top: 'top',
  transform: 'transform',
  transformMatrix: 'transformMatrix',
  transformOrigin: 'transformOrigin',
  translateX: 'translateX',
  translateY: 'translateY',
  w: 'width',
  width: 'width',
  zIndex: 'zIndex',
};
