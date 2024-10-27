import { useMemo, useRef, useState, type JSX } from 'react';
import {
  setYear,
  setMonth,
  formatDate,
  startOfMonth,
} from '@core/utils/dateUtils';

import { Item } from './Item';
import { Text } from '../../Text';
import { Stack } from '../../Stack';
import { Button } from '../../Button';
import {
  WheelPicker,
  type IWheelPickerProps,
  type IWheelPickerImperativeHandleProps,
} from '../../WheelPicker';

import type { IDataProps, TType } from './interface';

export * from './interface';

interface IOnOkParams {
  value: Date;
  rawValue: number;
}

export interface ISelectorProps {
  type?: TType;
  data: IDataProps[];
  defaultValue?: Date;
  onOk?: (params: IOnOkParams) => void;
}

export function Selector({
  data,
  onOk,
  type = 'year',
  defaultValue = new Date(),
}: ISelectorProps): JSX.Element {
  const itemHeight = 56;
  const isYear = type === 'year';
  const [value, setValue] = useState(defaultValue);
  const wheelRef = useRef<IWheelPickerImperativeHandleProps>();
  const [rawValue, setRawValue] = useState(defaultValue.getMonth() + 1);

  const handleOnChange: IWheelPickerProps<IDataProps>['onChange'] = ({
    data,
  }) => {
    if (type === 'year') {
      setValue(setYear(value, data.value));
    } else {
      setValue(setMonth(startOfMonth(value), data.value - 1));
    }

    setRawValue(data.value);
  };

  const selectedIndex = useMemo(() => {
    let val = value.getFullYear();

    if (type === 'month') {
      val = value.getMonth() + 1;
    }

    return data.findIndex((e) => e.value === val);
  }, [data, type, value]);

  const handleOk = () => {
    onOk?.({
      value,
      rawValue,
    });
  };

  const handleScrollToItem = (index: number) => {
    wheelRef.current.scrollToTargetIndex(index);
  };

  return (
    <Stack spacing={4}>
      <Text fontSize={35} color={isYear ? 'black' : 'gray.400'}>
        {value.getFullYear()}
      </Text>
      <Text fontSize={35} color={!isYear ? 'black' : 'gray.400'}>
        {formatDate(value, {
          format: 'ccc, dd MMM',
        })}
      </Text>
      <WheelPicker
        data={data}
        ref={wheelRef}
        h={itemHeight * 5}
        itemHeight={itemHeight}
        onChange={handleOnChange}
        selectedIndex={selectedIndex}
        renderItem={({ data, index, isSelected, style }) => {
          return (
            <Item
              key={index}
              data={data}
              index={index}
              style={style}
              isSelected={isSelected}
              onPress={handleScrollToItem}
            />
          );
        }}
      />
      <Stack justifyContent='flex-end'>
        <Button
          color='black'
          fontSize={25}
          onPress={handleOk}
          alignSelf='flex-end'
        >
          OK
        </Button>
      </Stack>
    </Stack>
  );
}
