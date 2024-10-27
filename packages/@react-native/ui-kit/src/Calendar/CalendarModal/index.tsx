import { TouchableOpacity } from 'react-native';
import { formatDate } from '@core/utils/dateUtils';
import { useRef, useState, type JSX } from 'react';

import { Show } from '../../Show';
import { Text } from '../../Text';
import { Icon } from '../../Icon';
import { Heading } from '../../Heading';
import { HStack, Stack } from '../../Stack';
import { ModalContent } from './ModalContent';
import { Modal, type IModalImperativeHandleProps } from '../../Modal';

import type { ICalendarProps } from '../Calendar';

export interface ICalendarModalProps {
  label?: string;
  defaultValue?: Date;
  calendarProps?: ICalendarProps;
  onChange?: (date: Date) => void;
}

export function CalendarModal({
  label,
  onChange,
  defaultValue,
  calendarProps,
}: ICalendarModalProps): JSX.Element {
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
          px={2}
          py={2}
          spacing={4}
          shadowRadius={2}
          bgColor='gray.200'
          shadowOpacity={0.3}
          shadowOffset={{
            width: -1,
            height: 1,
          }}
        >
          <Heading size='sx'>
            {formatDate(date, { format: 'dd/MM/yyyy' })}
          </Heading>
          <Icon name='calendar-month' size={24} />
        </HStack>
      </TouchableOpacity>
      <Modal ref={modalRef} spacing={4}>
        <ModalContent
          onOk={handleOk}
          defaultValue={defaultValue}
          closeModal={handleCloseModal}
          calendarProps={calendarProps}
        />
      </Modal>
    </Stack>
  );
}
