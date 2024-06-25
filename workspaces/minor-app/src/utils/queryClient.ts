import Toast from 'react-native-toast-message';
import { MutationCache, QueryClient } from '@react-native/utils/queryHooks';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (!mutation.options?.meta?.manual) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: error.message,
        });
      }
    },
  }),
});
