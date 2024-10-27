import { useState, type JSX } from 'react';
import { TouchableOpacity } from 'react-native';
import { formatDate, parseDate } from '@core/utils/dateUtils';

import { Icon } from '../../Icon';
import { Button } from '../../Button';
import { useColor } from '../../hooks';
import { Heading } from '../../Heading';
import { HStack, Stack } from '../../Stack';
import { Calendar, type DateData, type ICalendarProps } from '../Calendar';

interface IModalContentProps {
  defaultValue?: Date;
  closeModal: () => void;
  onOk?: (date: Date) => void;
  calendarProps?: ICalendarProps;
}

export function ModalContent({
  onOk,
  closeModal,
  defaultValue,
  calendarProps,
}: IModalContentProps): JSX.Element {
  const whiteColor = useColor('white');
  const [date, setDate] = useState<Date>(defaultValue || new Date());

  const dateAsString = formatDate(date, {
    format: 'yyyy-MM-dd',
  });

  const handleDayPress = (date: DateData) => {
    setDate(parseDate(date.dateString));
  };

  const handleOkPress = () => {
    onOk?.(date);
    closeModal();
  };

  return (
    <>
      <HStack justifyContent='space-between' alignItems='center'>
        <Stack>
          <Heading size='md'>Date</Heading>
          <Heading size='md'>
            {formatDate(date, { format: 'EEE, MMM dd' })}
          </Heading>
        </Stack>
        <TouchableOpacity onPress={closeModal}>
          <Icon name='close' size={25} />
        </TouchableOpacity>
      </HStack>
      <Calendar
        showTitle
        hideArrows={false}
        initialDate={dateAsString}
        onDayPress={handleDayPress}
        markedDates={{
          [dateAsString]: {
            selected: true,
          },
        }}
        theme={{
          ...({
            'stylesheet.calendar.main': {
              container: {
                backgroundColor: whiteColor,
              },
              monthView: {
                borderBottomWidth: 0,
              },
              dayContainer: {
                borderTopWidth: 0,
              },
            },
          } as TAny),
        }}
        {...calendarProps}
      />
      <HStack alignItems='center' justifyContent='flex-end' spacing={4}>
        <Button fontSize={25} variant='ghost' onPress={closeModal}>
          Cancel
        </Button>
        <Button fontSize={25} variant='ghost' onPress={handleOkPress}>
          OK
        </Button>
      </HStack>
    </>
  );
}
