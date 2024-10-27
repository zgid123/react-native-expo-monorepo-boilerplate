import { useState, type JSX } from 'react';
import { range } from '@core/utils/remeda';
import { setHours, setMinutes } from '@core/utils/dateUtils';

import { Item } from './Item';
import { Button } from '../../Button';
import { Heading } from '../../Heading';
import { HStack, Stack } from '../../Stack';
import { WheelPicker, type IWheelPickerProps } from '../../WheelPicker';

interface IModalContentProps {
  defaultValue?: Date;
  closeModal: () => void;
  onOk?: (date: Date) => void;
}

export function ModalContent({
  onOk,
  closeModal,
  defaultValue,
}: IModalContentProps): JSX.Element {
  const [date, setDate] = useState<Date>(defaultValue || new Date());
  const hour = date.getHours();
  const minute = date.getMinutes();
  const itemHeight = 56;

  const handleChangeHour: IWheelPickerProps<number>['onChange'] = (hour) => {
    setDate(setHours(date, hour.data));
  };

  const handleChangeMinute: IWheelPickerProps<number>['onChange'] = (
    minute,
  ) => {
    setDate(setMinutes(date, minute.data));
  };

  const handleOkPress = () => {
    onOk?.(date);
    closeModal();
  };

  return (
    <Stack spacing={4}>
      <Heading size='md'>Time</Heading>
      <HStack alignItems='center' spacing={4} justifyContent='center'>
        <WheelPicker
          h={itemHeight * 5}
          data={range(0, 24)}
          selectedIndex={hour}
          itemHeight={itemHeight}
          onChange={handleChangeHour}
          renderItem={({ data, isSelected, style }) => {
            return <Item data={data} style={style} isSelected={isSelected} />;
          }}
        />
        <WheelPicker
          h={itemHeight * 5}
          data={range(0, 60)}
          selectedIndex={minute}
          itemHeight={itemHeight}
          onChange={handleChangeMinute}
          renderItem={({ data, isSelected, style }) => {
            return <Item data={data} style={style} isSelected={isSelected} />;
          }}
        />
      </HStack>
      <HStack alignItems='center' justifyContent='flex-end' spacing={4}>
        <Button fontSize={25} variant='ghost' onPress={closeModal}>
          Cancel
        </Button>
        <Button fontSize={25} variant='ghost' onPress={handleOkPress}>
          OK
        </Button>
      </HStack>
    </Stack>
  );
}
