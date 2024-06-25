import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useState,
  forwardRef,
  useImperativeHandle,
  type ReactNode,
  type ForwardedRef,
} from 'react';

import type { JSX } from 'react';
import type { ViewStyle } from 'react-native';

import { Icon } from '../Icon';
import { Button } from '../Button';
import { HStack, Stack } from '../Stack';
import { SafeAreaView } from '../SafeAreaView';
import { useStyleProps } from '../styles/hooks';

import type { TSpacings } from '../ThemeProvider/v1';

interface IDrawerProps {
  spacing?: TSpacings;
  children?: ReactNode;
}

export interface IDrawerImperativeHandleProps {
  open: () => void;
  close: () => void;
}

function DrawerRender(
  { children, spacing }: IDrawerProps,
  ref?: ForwardedRef<IDrawerImperativeHandleProps>,
): JSX.Element {
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);

  const containerStyle = useStyleProps({
    m: 0,
    mr: 7,
  }) as ViewStyle;

  const closeDrawer = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {
      close: closeDrawer,
      open: () => {
        setVisible(true);
      },
    };
  }, []);

  return (
    <Modal
      isVisible={visible}
      swipeDirection='left'
      style={containerStyle}
      animationIn='slideInLeft'
      animationOut='slideOutLeft'
      onSwipeComplete={closeDrawer}
      onBackdropPress={closeDrawer}
    >
      <SafeAreaView bgColor='white'>
        <Stack w='100%' h='100%' px={4} spacing={10} {...insets}>
          <HStack alignItems='center' justifyContent='flex-end'>
            <Button
              mode='text'
              onPress={closeDrawer}
              contentStyle={{
                justifyContent: 'flex-end',
              }}
              labelStyle={{
                marginVertical: 0,
                marginHorizontal: 0,
              }}
            >
              <Icon source='close' size={30} />
            </Button>
          </HStack>
          <Stack spacing={spacing}>{children}</Stack>
        </Stack>
      </SafeAreaView>
    </Modal>
  );
}

export const Drawer = forwardRef(DrawerRender);

Drawer.displayName = 'CustomDrawer';
