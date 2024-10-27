import 'react-native-reanimated';

import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect, type JSX } from 'react';
import Toast from 'react-native-toast-message';
import FontAwesome from '@expo/vector-icons/FontAwesome6';
import { SafeAreaView, UIKitProvider } from '@react-native/ui-kit';
import { QueryClientProvider } from '@react-native/utils/queryHooks';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { queryClient } from '~/utils/queryClient';

export { ErrorBoundary } from 'expo-router';

preventAutoHideAsync();

function RootLayoutNav(): JSX.Element {
  const insets = useSafeAreaInsets();

  return (
    <>
      <UIKitProvider>
        <SafeAreaView>
          <Slot />
        </SafeAreaView>
      </UIKitProvider>
      <Toast topOffset={insets.top} />
    </>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <RootLayoutNav />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
