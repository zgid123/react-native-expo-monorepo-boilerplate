import { useMemo, type JSX } from 'react';

import { Text, type ITextProps } from '../../Text';
import { Stack, type IStackProps } from '../../Stack';

interface IItemProps extends IStackProps {
  data: number;
  isSelected: boolean;
}

export function Item({
  data,
  style,
  isSelected,
  ...rest
}: IItemProps): JSX.Element {
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

  return (
    <Stack minW={120} style={style} py={2} {...rest}>
      <Text textAlign='center' {...textProps}>
        {data}
      </Text>
    </Stack>
  );
}
