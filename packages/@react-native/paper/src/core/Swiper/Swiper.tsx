import { windowWidth } from '@react-native/utils';
import Carousel, {
  type CarouselRenderItem,
} from 'react-native-reanimated-carousel';

import type { JSX } from 'react';

import { useProps } from '../styles/hooks';

import type { TViewStyleProps } from '../styles/constants';

interface ISwiperProps<T> extends TViewStyleProps {
  data: T[];
  enabled?: boolean;
  renderItem: CarouselRenderItem<T>;
  carousel?: {
    width?: number;
    height?: number;
  };
}

export function Swiper<T>({
  carousel = {},
  ...rest
}: ISwiperProps<T>): JSX.Element {
  const { width = windowWidth * 0.8, height = windowWidth / 2 } = carousel;

  const { props, styleProps } = useProps({
    w: '100%',
    overflow: 'visible',
    ...rest,
  });

  return (
    <Carousel
      loop={false}
      width={width}
      pagingEnabled
      height={height}
      vertical={false}
      autoPlay={false}
      style={styleProps}
      {...props}
    />
  );
}

Swiper.displayName = 'CustomPaper';
