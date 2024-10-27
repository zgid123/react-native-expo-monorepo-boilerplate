import { TouchableOpacity } from 'react-native';
import { formatDate } from '@core/utils/dateUtils';
import { useRef, useState, type JSX } from 'react';

import { Icon } from '../../Icon';
import { Show } from '../../Show';
import { Text } from '../../Text';
import { Heading } from '../../Heading';
import { HStack, Stack } from '../../Stack';
import { ModalContent } from './ModalContent';
import { Modal, type IModalImperativeHandleProps } from '../../Modal';

export interface ITimeModalPickerProps {
  label?: string;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

export function TimeModalPicker({
  label,
  onChange,
  defaultValue,
}: ITimeModalPickerProps): JSX.Element {
  const modalRef = useRef<IModalImperativeHandleProps>(null);
  const [date, setDate] = useState<Date>(defaultValue || new Date());

  const handleOpenModal = () => {
    modalRef.current.open();
  };

  const handleCloseModal = () => {
    modalRef.current.close();
  };

  const handleOk = (date: Date) => {
    onChange?.(date);
    setDate(date);
  };

  return (
    <Stack spacing={2}>
      <Show when={!!label}>
        <Text>{label}</Text>
      </Show>
      <TouchableOpacity onPress={handleOpenModal}>
        <HStack
          px={4}
          py={2}
          spacing={4}
          borderWidth={1}
          borderRadius={5}
          alignItems='center'
          borderColor='gray.400'
        >
          <Heading size='sx' textAlign='center'>
            {formatDate(date, { format: 'HH:mm' })}
          </Heading>
          <Icon name='clock-outline' size={24} />
        </HStack>
      </TouchableOpacity>
      <Modal ref={modalRef} spacing={4}>
        <ModalContent
          onOk={handleOk}
          defaultValue={defaultValue}
          closeModal={handleCloseModal}
        />
      </Modal>
    </Stack>
  );
}
