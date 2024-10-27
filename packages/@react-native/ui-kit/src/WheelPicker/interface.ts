import type { JSX } from 'react';
import type { ViewStyle } from 'react-native';

import type { IStackProps } from '../Stack';

interface IRenderItemParams<T> {
  data: T;
  index: number;
  style: ViewStyle;
  isSelected: boolean;
  selectedIndex: number;
}

interface IOnChangeParams<T> {
  data: T;
  index: number;
}

export interface IWheelPickerProps<T> extends IStackProps {
  data: T[];
  itemHeight?: number;
  selectedIndex?: number;
  highlightProps?: IStackProps;
  onChange: (params: IOnChangeParams<T>) => void;
  renderItem?: (params: IRenderItemParams<T>) => JSX.Element;
}
