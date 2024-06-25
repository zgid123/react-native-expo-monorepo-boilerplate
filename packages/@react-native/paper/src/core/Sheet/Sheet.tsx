import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useMemo,
  forwardRef,
  type JSX,
  type ReactNode,
  type ForwardedRef,
} from 'react';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetModalProvider,
  type BottomSheetModalProps,
} from '@gorhom/bottom-sheet';

import { Show } from '../Show';

interface ISheetProps extends Omit<BottomSheetModalProps, 'children'> {
  children: ReactNode;
  renderHeader?: () => ReactNode;
}

export type TSheetMethods = BottomSheetModal;

function SheetRender(
  { children, renderHeader, ...rest }: ISheetProps,
  ref?: ForwardedRef<TSheetMethods>,
): JSX.Element {
  const insets = useSafeAreaInsets();

  const snapPoints = useMemo(() => {
    return ['25%', '50%', '80%'];
  }, []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        topInset={insets.top}
        snapPoints={snapPoints}
        {...rest}
      >
        <Show when={!!renderHeader}>
          <BottomSheetView>{renderHeader?.()}</BottomSheetView>
        </Show>
        <BottomSheetScrollView>{children}</BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

export const Sheet = forwardRef(SheetRender);

Sheet.displayName = 'CustomSheet';
