import Animated, {
  withTiming,
  withRepeat,
  withSequence,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import type { JSX } from 'react';

import { useColor } from '../hooks';
import { Stack, type IStackProps } from '../Stack';

export function Skeleton(props: IStackProps): JSX.Element {
  const gray400 = useColor('gray.400');

  const opacity = useDerivedValue(() => {
    return withRepeat(
      withSequence(
        withTiming(0.2),
        withTiming(1, { duration: 700 }),
        withTiming(0.4, { duration: 700 }),
      ),
      -1,
    );
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: '100%',
      height: '100%',
      opacity: opacity.value,
      backgroundColor: gray400,
      borderRadius: props.borderRadius,
    };
  });

  return (
    <Stack h={20} w='100%' bgColor='gray.200' {...props}>
      <Animated.View style={animatedStyle} />
    </Stack>
  );
}
