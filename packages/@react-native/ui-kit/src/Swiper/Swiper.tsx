import { windowWidth } from '@react-native/utils';
import Carousel, {
  type CarouselRenderItem,
} from 'react-native-reanimated-carousel';

import type { JSX } from 'react';

import { useProps } from '../hooks';

import type { IViewStyleProps } from '../styling/styles';

interface ISwiperProps<T> extends IViewStyleProps {
  data: T[];
  enabled?: boolean;
  renderItem: CarouselRenderItem<T>;
  carousel?: {
    width?: number;
    height?: number;
  };
}

export function Swiper<T>({
  data = [],
  renderItem,
  carousel = {},
  ...rest
}: ISwiperProps<T>): JSX.Element {
  const {
    height = windowWidth / 2,
    width = windowWidth * (data.length > 1 ? 0.8 : 0.88),
  } = carousel;

  const { props, viewStyleProps } = useProps({
    w: '100%',
    overflow: 'visible',
    ...rest,
  });

  return (
    <Carousel
      data={data}
      loop={false}
      width={width}
      pagingEnabled
      vertical={false}
      autoPlay={false}
      style={viewStyleProps}
      renderItem={renderItem}
      height={data.length ? height : 0}
      {...props}
    />
  );
}

Swiper.displayName = 'UIKitSwiper';
