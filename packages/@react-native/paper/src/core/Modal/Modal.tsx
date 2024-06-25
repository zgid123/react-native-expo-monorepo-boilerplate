import { Portal, Modal as PaperModal } from 'react-native-paper';
import {
  useState,
  forwardRef,
  useImperativeHandle,
  type JSX,
  type ReactNode,
  type ForwardedRef,
} from 'react';

import { useProps } from '../styles/hooks';

import type { TViewStyleProps } from '../styles/constants';

interface IModalProps extends TViewStyleProps {
  children?: ReactNode;
}

export interface IModalImperativeHandleProps {
  open: () => void;
  close: () => void;
}

function ModalRender(
  { children, ...rest }: IModalProps,
  ref?: ForwardedRef<IModalImperativeHandleProps>,
): JSX.Element {
  const [visible, setVisible] = useState(false);
  const { props, styleProps } = useProps(rest);

  const closeModal = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {
      close: closeModal,
      open: () => {
        setVisible(true);
      },
    };
  }, []);

  return (
    <Portal>
      <PaperModal
        visible={visible}
        onDismiss={closeModal}
        contentContainerStyle={styleProps}
        {...props}
      >
        {children}
      </PaperModal>
    </Portal>
  );
}

export const Modal = forwardRef(ModalRender);

Modal.displayName = 'CustomModal';
