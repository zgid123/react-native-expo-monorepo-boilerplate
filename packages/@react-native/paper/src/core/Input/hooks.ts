import { useStyleProps } from '../styles/hooks';

import type { TStyleProps } from '../styles/constants';

export function useDefaultStyles(): TStyleProps {
  return useStyleProps({
    h: 45,
    borderRadius: 40,
  }) as TStyleProps;
}

export function useOutlineDefaultStyles(): TStyleProps {
  return useStyleProps({
    borderRadius: 40,
    borderColor: 'brand.primary',
  }) as TStyleProps;
}
