import { omit, pick } from '@core/utils/objectUtils';

import { flexPropsMapping, type IFlexStyleProps } from './flexStyle';
import { textPropsMapping, type ITextStyleProps } from './textStyle';
import { borderPropsMapping, type IBorderStyleProps } from './borderStyle';
import { layoutPropsMapping, type ILayoutStyleProps } from './layoutStyle';
import { spacingPropsMapping, type ISpacingStyleProps } from './spacingStyle';

export * from './borderStyle';
export * from './flexStyle';
export * from './layoutStyle';
export * from './spacingStyle';
export * from './textStyle';

export type TViewStyleProps = IBorderStyleProps &
  IFlexStyleProps &
  ILayoutStyleProps &
  ISpacingStyleProps;

export type TViewStyleKeys = keyof TViewStyleProps;

export type TStyleProps = TViewStyleProps & ITextStyleProps;

export type TStyleKeys = keyof TStyleProps;

export const stylePropsMapping: Record<TStyleKeys, TStyleKeys> = {
  ...borderPropsMapping,
  ...flexPropsMapping,
  ...layoutPropsMapping,
  ...spacingPropsMapping,
  ...textPropsMapping,
};

export const colorPropsMapping: Partial<Record<TStyleKeys, boolean>> = {
  backgroundColor: true,
  bg: true,
  bgColor: true,
  borderBlockColor: true,
  borderBlockEndColor: true,
  borderBlockStartColor: true,
  borderBottomColor: true,
  borderColor: true,
  borderEndColor: true,
  borderLeftColor: true,
  borderRightColor: true,
  borderStartColor: true,
  borderTopColor: true,
};

export const spacePropsMapping: Partial<Record<TStyleKeys, boolean>> = {
  ...propsMapping(flexPropsMapping, ['gap', 'rowGap', 'columnGap']),
  ...propsMapping(spacingPropsMapping, []),
};

function propsMapping<T extends object, TKeys extends Array<keyof T>>(
  obj: T,
  keys: TKeys,
): Partial<Record<TStyleKeys, boolean>> {
  const execFunc = keys.length ? pick : omit;

  return Object.keys(execFunc(obj, keys)).reduce<
    Partial<Record<TStyleKeys, boolean>>
  >((result, key) => {
    (result as TAny)[key] = true;

    return result;
  }, {});
}
