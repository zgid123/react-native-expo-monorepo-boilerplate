import { defineStyleConfig } from '../utils';

export type TTextSizes = 'sx' | 'normal' | 'md' | 'lg';

export const textStyle = defineStyleConfig<'text', string, TTextSizes>({
  style: {
    fontSize: 14,
  },
  sizes: {
    sx: {
      fontSize: 12,
    },
    md: {
      fontSize: 16,
    },
    lg: {
      fontSize: 18,
    },
  },
  default: {
    variant: 'normal',
  },
});
