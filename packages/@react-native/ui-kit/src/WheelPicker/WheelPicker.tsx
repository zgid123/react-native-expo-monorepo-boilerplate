import { ScrollView, StyleSheet, View } from 'react-native';
import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  type Ref,
  type ReactNode,
  type ForwardedRef,
  type RefAttributes,
} from 'react';

import { Stack } from '../Stack';
import { useEvents } from './hooks';
import { EmptyBlock } from './EmptyBlock';
import { useMultiStyleConfig, useProps, useStyleProps } from '../hooks';

import type { IWheelPickerProps } from './interface';
import type { TWheelPickerPartsProps } from '../styling/components';

function higherForwardRef<T, P>(
  render: (props: P, ref: Ref<T>) => ReactNode,
): (props: P & RefAttributes<T>) => ReactNode {
  return forwardRef(render) as TAny;
}

/**
 * copy from package react-native-wheel-scrollview-picker
 * since this package seems to be no longer maintained
 */

export interface IWheelPickerImperativeHandleProps {
  scrollToTargetIndex: (val: number) => void;
}

function WheelPickerRender<T>(
  {
    h,
    data,
    height,
    onChange,
    renderItem,
    itemHeight = 56,
    highlightProps = {},
    selectedIndex: defaultSelectedIndex,
    ...rest
  }: IWheelPickerProps<T>,
  ref: ForwardedRef<IWheelPickerImperativeHandleProps>,
) {
  const wrapperRef = useRef<ScrollView>(null);
  const [initialized, setInitialized] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex ?? 0);

  const {
    timer,
    onScrollEndDrag,
    onScrollBeginDrag,
    onMomentumScrollEnd,
    onMomentumScrollBegin,
  } = useEvents({
    data,
    onChange,
    itemHeight,
    wrapperRef,
    selectedIndex,
    setSelectedIndex,
  });

  useEffect(() => {
    if (initialized) {
      return;
    }

    setInitialized(true);

    setTimeout(() => {
      const y = itemHeight * selectedIndex;
      wrapperRef?.current?.scrollTo({ y: y });
    }, 0);

    return () => {
      timer && clearTimeout(timer);
    };
  }, [initialized, itemHeight, selectedIndex, timer]);

  useImperativeHandle(ref, () => ({
    scrollToTargetIndex: (val: number) => {
      setSelectedIndex(val);
      const selectedValue = data[val];

      onChange({
        index: val,
        data: selectedValue,
      });

      wrapperRef?.current?.scrollTo({ y: val * itemHeight });
    },
  }));

  const { container, highlightWrapper } =
    useMultiStyleConfig<TWheelPickerPartsProps>('WheelPicker');

  const { props, viewStyleProps } = useProps({
    ...rest,
    h: h || height || itemHeight * 5,
  });

  const helperHeight = (Number(viewStyleProps.height) - itemHeight) / 2;

  const {
    borderWidth: highlightBorderWidth = StyleSheet.hairlineWidth,
    ...highlightRest
  } = highlightProps;

  const { viewStyleProps: itemStyle } = useStyleProps({
    h: itemHeight,
    alignItems: 'center',
    justifyContent: 'center',
  });

  return (
    <Stack h={viewStyleProps.height}>
      <View style={[container.viewStyleProps, viewStyleProps]} {...props}>
        <Stack
          style={highlightWrapper.viewStyleProps}
          h={itemHeight}
          top={helperHeight}
          borderWidth={highlightBorderWidth}
          {...highlightRest}
        />
        <ScrollView
          bounces={false}
          ref={wrapperRef}
          nestedScrollEnabled
          onScrollEndDrag={onScrollEndDrag}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={onScrollBeginDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onMomentumScrollBegin={onMomentumScrollBegin}
        >
          <EmptyBlock h={helperHeight} />
          {data.map((datumn, index) => {
            return renderItem({
              index,
              data: datumn,
              selectedIndex,
              style: itemStyle,
              isSelected: selectedIndex === index,
            });
          })}
          <EmptyBlock h={helperHeight} />
        </ScrollView>
      </View>
    </Stack>
  );
}

WheelPickerRender.displayName = 'UIKitWheelPicker';

export const WheelPicker = higherForwardRef(WheelPickerRender);
