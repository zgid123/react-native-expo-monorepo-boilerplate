import { useI18n } from '@react-native/i18n';
import { useEffect, useRef, useState, type JSX } from 'react';

import { Text } from '../Text';
import { Show } from '../Show';
import { HStack } from '../Stack';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { confirmModalEvent, type IConfirmModalEventProps } from './event';
import { Modal, useModal, type IModalImperativeHandleProps } from '../Modal';

import type { IConfirmProps, TModalKey } from './interface';

interface IConfirmModalProps {
  modalKey?: TModalKey;
}

const defaultProps: IConfirmProps = {
  title: 'Are you sure?',
};

export function ConfirmModal({
  modalKey = 'global',
}: IConfirmModalProps): JSX.Element {
  const { t } = useI18n();
  const modalRef = useRef<IModalImperativeHandleProps>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [props, setProps] = useState<IConfirmProps>(defaultProps);
  const { close, open } = useModal(modalRef);

  const handleClose = () => {
    close();
    setIsLoading(false);
    setProps(defaultProps);
  };

  useEffect(() => {
    const openConfirm: IConfirmModalEventProps['confirm'] = ({
      modalKey: key = 'global',
      ...rest
    } = {}) => {
      if (!key || key !== modalKey) {
        return;
      }

      open();
      setProps({
        ...defaultProps,
        ...rest,
      });
    };

    confirmModalEvent.on('confirm', openConfirm);

    return () => {
      confirmModalEvent.off('confirm', openConfirm);
    };
  }, [modalKey, open]);

  const {
    title,
    render,
    onSubmit,
    getLoading,
    closeProps,
    description,
    confirmProps,
  } = props;

  const { title: closeTitle } = closeProps || {};
  const { title: confirmTitle } = confirmProps || {};

  const submit = () => {
    onSubmit?.({
      close: handleClose,
    });

    setIsLoading(getLoading?.() ?? false);
  };

  return (
    <Modal ref={modalRef}>
      <Show when={!render}>
        <Heading size='md'>{title}</Heading>
        <Text size='md'>{description}</Text>
      </Show>
      <Show when={!!render}>{render?.()}</Show>
      <HStack justifyContent='flex-end' spacing={2} mt={4}>
        <Button
          fontSize={20}
          variant='ghost'
          disabled={isLoading}
          onPress={handleClose}
        >
          {closeTitle || t('trans:commons.close')}
        </Button>
        <Button
          fontSize={20}
          variant='ghost'
          onPress={submit}
          loadingText={false}
          disabled={isLoading}
          isLoading={isLoading}
        >
          {confirmTitle || t('trans:commons.confirm')}
        </Button>
      </HStack>
    </Modal>
  );
}
