import { defineStyleConfig } from '../utils';

export const dividerStyle = defineStyleConfig<'view'>({
  style: {
    h: 1,
    w: '100%',
    borderTopWidth: 1,
    borderColor: 'gray.300',
  },
});
