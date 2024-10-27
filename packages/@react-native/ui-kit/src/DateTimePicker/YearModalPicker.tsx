import { range } from '@core/utils/remeda';
import { formatDate } from '@core/utils/dateUtils';
import { useMemo, useRef, useState, type JSX } from 'react';

import { Stack } from '../Stack';
import { Button } from '../Button';
import { Modal, type IModalImperativeHandleProps } from '../Modal';
import { Selector, type IDataProps, type ISelectorProps } from './Selector';

import type { IDateTimeModalPickerProps } from './interface';

export interface IYearModalPickerProps extends IDateTimeModalPickerProps {}

export function YearModalPicker({
  onChange,
  onSubmit,
  defaultValue,
}: IYearModalPickerProps): JSX.Element {
  const [date, setDate] = useState(defaultValue || new Date());
  const modalRef = useRef<IModalImperativeHandleProps>(null);

  const years = useMemo<IDataProps[]>(() => {
    const now = new Date();

    return range(now.getFullYear() - 3, now.getFullYear() + 2)
      .map((year) => {
        return {
          value: year,
          text: year.toString(),
        };
      })
      .reverse();
  }, []);

  const handleOpenModal = () => {
    modalRef.current.open();
  };

  const handleOk: ISelectorProps['onOk'] = ({ value, rawValue }) => {
    setDate(value);

    onChange?.({
      date: value,
      value: rawValue,
    });

    onSubmit?.(date);

    modalRef.current.close();
  };

  return (
    <Stack>
      <Button
        py={2}
        px={9}
        minH={36}
        color='black'
        bgColor='gray.200'
        onPress={handleOpenModal}
      >
        {formatDate(date, { format: 'yyyy' })}
      </Button>
      <Modal ref={modalRef}>
        <Selector data={years} onOk={handleOk} defaultValue={date} />
      </Modal>
    </Stack>
  );
}
