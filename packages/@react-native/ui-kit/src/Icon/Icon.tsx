import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import type { JSX } from 'react';
import type { IconProps } from 'react-native-vector-icons/Icon';

import { useProps } from '../hooks';

import type { ITextStyleProps } from '../styling/styles';
import type { TMaterialCommunityIcons } from './interfaces';

interface IIconProps<
  TType extends 'materialCommunityIcons' = 'materialCommunityIcons',
> extends Omit<IconProps, 'name' | 'color'>,
    ITextStyleProps {
  type?: TType;
  name?: TType extends 'materialCommunityIcons'
    ? TMaterialCommunityIcons
    : string;
}

export function Icon<
  TType extends 'materialCommunityIcons' = 'materialCommunityIcons',
>({
  name,
  style,
  type: _type,
  color = 'black',
  ...rest
}: IIconProps<TType>): JSX.Element {
  const { props, textStyleProps } = useProps({
    ...rest,
    color,
  });

  return (
    <MaterialCommunityIcon
      name={name}
      style={[textStyleProps, style]}
      {...props}
    />
  );
}
