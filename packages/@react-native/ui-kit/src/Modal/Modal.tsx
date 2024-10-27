import RNModal, { type ModalProps } from 'react-native-modal';
import {
  useState,
  forwardRef,
  useCallback,
  useImperativeHandle,
  type JSX,
  type ForwardedRef,
} from 'react';

import { Stack, type IStackProps } from '../Stack';
import { useMultiStyleConfig, useProps } from '../hooks';

import type { TModalPartsProps } from '../styling/components';
import type { IModalImperativeHandleProps } from './interface';

interface IModalProps extends Partial<ModalProps>, IStackProps {
  onClose?: () => void;
}

function ModalRender(
  { children, onClose, spacing = 4, ...rest }: IModalProps,
  ref?: ForwardedRef<IModalImperativeHandleProps>,
): JSX.Element {
  const [visible, setVisible] = useState(false);

  const { container, innerContainer } =
    useMultiStyleConfig<TModalPartsProps>('Modal');

  const { props, viewStyleProps } = useProps({
    ...rest,
  });

  const closeModal = useCallback(() => {
    setVisible(false);
    onClose?.();
  }, [onClose]);

  useImperativeHandle(ref, () => {
    return {
      close: closeModal,
      open: () => {
        setVisible(true);
      },
    };
  }, [closeModal]);

  return (
    <RNModal
      isVisible={visible}
      onDismiss={closeModal}
      onBackdropPress={closeModal}
      onSwipeComplete={closeModal}
      style={container.viewStyleProps}
      {...props}
    >
      <Stack
        spacing={spacing}
        style={[innerContainer.viewStyleProps, viewStyleProps]}
      >
        {children}
      </Stack>
    </RNModal>
  );
}

ModalRender.displayName = 'UIKitModal';

export const Modal = forwardRef(ModalRender);
