import { formatDate } from '@core/utils/dateUtils';
import { useRef, useState, type JSX } from 'react';

import { Stack } from '../Stack';
import { Button } from '../Button';
import { Modal, type IModalImperativeHandleProps } from '../Modal';
import { Selector, type IDataProps, type ISelectorProps } from './Selector';

import type { IDateTimeModalPickerProps } from './interface';

export interface IMonthModalPickerProps extends IDateTimeModalPickerProps {}

const months: IDataProps[] = [
  { text: 'January', value: 1 },
  { text: 'February', value: 2 },
  { text: 'March', value: 3 },
  { text: 'April', value: 4 },
  { text: 'May', value: 5 },
  { text: 'June', value: 6 },
  { text: 'July', value: 7 },
  { text: 'August', value: 8 },
  { text: 'September', value: 9 },
  { text: 'October', value: 10 },
  { text: 'November', value: 11 },
  { text: 'December', value: 12 },
];

export function MonthModalPicker({
  onChange,
  onSubmit,
  defaultValue,
}: IMonthModalPickerProps): JSX.Element {
  const modalRef = useRef<IModalImperativeHandleProps>(null);
  const [date, setDate] = useState(defaultValue || new Date());

  const handleOpenModal = () => {
    modalRef.current.open();
  };

  const handleOk: ISelectorProps['onOk'] = ({ rawValue, value }) => {
    setDate(value);

    onChange?.({
      date: value,
      value: rawValue,
    });

    onSubmit?.(value);

    modalRef.current.close();
  };

  return (
    <Stack minW={145}>
      <Button
        py={2}
        px={9}
        minH={36}
        color='black'
        bgColor='gray.200'
        onPress={handleOpenModal}
      >
        {formatDate(date, { format: 'MMMM' })}
      </Button>
      <Modal ref={modalRef}>
        <Selector
          type='month'
          data={months}
          onOk={handleOk}
          defaultValue={date}
        />
      </Modal>
    </Stack>
  );
}
