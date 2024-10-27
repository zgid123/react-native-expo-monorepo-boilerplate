import {
  useState,
  useCallback,
  type Dispatch,
  type SetStateAction,
  type MutableRefObject,
} from 'react';
import {
  Platform,
  type ScrollView,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import type { IWheelPickerProps } from './interface';

interface IUseEventsParams<T = unknown> {
  data: T[];
  itemHeight: number;
  selectedIndex: number;
  wrapperRef: MutableRefObject<ScrollView>;
  onChange: IWheelPickerProps<T>['onChange'];
  setSelectedIndex: Dispatch<SetStateAction<number>>;
}

interface IUseEventsReturnProps {
  onScrollBeginDrag: () => void;
  onMomentumScrollBegin: () => void;
  timer: ReturnType<typeof setTimeout>;
  onScrollEndDrag: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onMomentumScrollEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export function useEvents<T = unknown>({
  data,
  onChange,
  itemHeight,
  wrapperRef,
  selectedIndex,
  setSelectedIndex,
}: IUseEventsParams<T>): IUseEventsReturnProps {
  const [isScrollTo, setIsScrollTo] = useState(false);
  const [dragStarted, setDragStarted] = useState(false);
  const [momentumStarted, setMomentumStarted] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>(null);

  const scrollFix = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      e.persist();
      let y = 0;
      const h = itemHeight;

      if (e.nativeEvent?.contentOffset) {
        y = e.nativeEvent.contentOffset.y;
      }

      const currentIndex = Math.round(y / h);
      const currentY = currentIndex * h;

      if (currentY !== y) {
        if (Platform.OS === 'ios') {
          setIsScrollTo(true);
        }

        wrapperRef.current?.scrollTo({ y: currentY });
      }

      if (selectedIndex === currentIndex) {
        return;
      }

      if (onChange) {
        const selectedValue = data[currentIndex];
        setSelectedIndex(currentIndex);

        onChange({
          data: selectedValue,
          index: currentIndex,
        });
      }
    },
    [data, itemHeight, onChange, selectedIndex, setSelectedIndex, wrapperRef],
  );

  const onScrollBeginDrag = () => {
    setDragStarted(true);

    if (Platform.OS === 'ios') {
      setIsScrollTo(false);
    }

    timer && clearTimeout(timer);
  };

  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    e.persist();
    setDragStarted(false);

    timer && clearTimeout(timer);

    setTimer(
      setTimeout(() => {
        if (!momentumStarted) {
          scrollFix(e);
        }
      }, 50),
    );
  };
  const onMomentumScrollBegin = () => {
    setMomentumStarted(true);
    timer && clearTimeout(timer);
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setMomentumStarted(false);

    if (!isScrollTo && !dragStarted) {
      scrollFix(e);
    }
  };

  return {
    timer,
    onScrollEndDrag,
    onScrollBeginDrag,
    onMomentumScrollEnd,
    onMomentumScrollBegin,
  };
}
