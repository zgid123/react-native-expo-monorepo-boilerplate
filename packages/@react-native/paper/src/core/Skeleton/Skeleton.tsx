import Animated, {
  withTiming,
  withRepeat,
  withSequence,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import type { JSX } from 'react';

import { Stack, type IStackProps } from '../Stack';
import { useColor, useStyleProps } from '../styles/hooks';

import type { TViewStyleProps } from '../styles/constants';

export function Skeleton(props: TViewStyleProps): JSX.Element {
  const bgColor = useColor('tertiary');

  const style = useStyleProps({
    h: 20,
    w: '100%',
    ...props,
  });

  const opacity = useDerivedValue(() => {
    return withRepeat(
      withSequence(
        withTiming(0.5),
        withTiming(1, { duration: 700 }),
        withTiming(0.5, { duration: 700 }),
      ),
      -1,
    );
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: '100%',
      height: '100%',
      opacity: opacity.value,
      backgroundColor: bgColor,
      borderRadius: props.borderRadius,
    };
  });

  return (
    <Stack style={style as IStackProps['style']}>
      <Animated.View style={animatedStyle} />
    </Stack>
  );
}

Skeleton.displayName = 'CustomSkeleton';
