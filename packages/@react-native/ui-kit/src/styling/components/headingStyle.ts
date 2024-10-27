import { defineStyleConfig } from '../utils';

export type THeadingSizes = 'sx' | 'normal' | 'md';

export const headingStyle = defineStyleConfig<'text', string, THeadingSizes>({
  style: {
    fontSize: 22,
  },
  sizes: {
    sx: {
      fontSize: 16,
    },
    md: {
      fontSize: 26,
    },
  },
  default: {
    size: 'normal',
    variant: 'normal',
  },
});
