import { useMemo, type JSX } from 'react';
import { TouchableOpacity } from 'react-native';

import { Text, type ITextProps } from '../../Text';
import { Stack, type IStackProps } from '../../Stack';

import type { IDataProps } from './interface';

interface IItemProps extends IStackProps {
  index: number;
  data: IDataProps;
  isSelected: boolean;
  onPress?: (index: number) => void;
}

export function Item({
  data,
  index,
  onPress,
  isSelected,
  ...rest
}: IItemProps): JSX.Element {
  const { text } = data;

  const textProps = useMemo<Partial<ITextProps>>(() => {
    if (isSelected) {
      return {
        fontSize: 35,
        fontWeight: 'bold',
      };
    }

    return {
      fontSize: 20,
      color: 'gray.400',
    };
  }, [isSelected]);

  const handlePress = () => {
    onPress?.(index);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Stack py={2} {...rest}>
        <Text textAlign='center' {...textProps}>
          {text}
        </Text>
      </Stack>
    </TouchableOpacity>
  );
}
