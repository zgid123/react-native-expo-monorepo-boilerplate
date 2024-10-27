import Modal from 'react-native-modal';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useState,
  forwardRef,
  useImperativeHandle,
  type JSX,
  type ReactNode,
  type ForwardedRef,
} from 'react';

import { Icon } from '../Icon';
import { useMultiStyleConfig } from '../hooks';
import { HStack, Stack, type IStackProps } from '../Stack';

import type { TDrawerPartsProps } from '../styling/components';

interface IDrawerProps extends IStackProps {
  children?: ReactNode;
}

export interface IDrawerImperativeHandleProps {
  open: () => void;
  close: () => void;
}

function DrawerRender(
  { children, ...rest }: IDrawerProps,
  ref?: ForwardedRef<IDrawerImperativeHandleProps>,
): JSX.Element {
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);

  const { modal, container, contentContainer, innerContainer, titleContainer } =
    useMultiStyleConfig<TDrawerPartsProps>('Drawer');

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
      animationIn='slideInLeft'
      animationOut='slideOutLeft'
      style={modal.viewStyleProps}
      onSwipeComplete={closeDrawer}
      onBackdropPress={closeDrawer}
    >
      <Stack
        pt={insets.top}
        pb={insets.bottom}
        style={container.viewStyleProps}
      >
        <Stack style={innerContainer.viewStyleProps} spacing={6}>
          <HStack style={titleContainer.viewStyleProps}>
            <TouchableOpacity onPress={closeDrawer}>
              <Icon name='close' size={30} />
            </TouchableOpacity>
          </HStack>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Stack style={contentContainer.viewStyleProps} {...rest}>
              {children}
            </Stack>
          </ScrollView>
        </Stack>
      </Stack>
    </Modal>
  );
}

export const Drawer = forwardRef(DrawerRender);

Drawer.displayName = 'UIKitDrawer';
