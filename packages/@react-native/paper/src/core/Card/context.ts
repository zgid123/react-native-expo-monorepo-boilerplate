import { createContext } from '@react-native/utils';

import type { AnimatableNumericValue } from 'react-native';

interface ICardContextProps {
  borderRadius?: AnimatableNumericValue;
}

const [CardProvider, useCardContext] = createContext<ICardContextProps>({
  name: 'CardContext',
});

export { CardProvider, useCardContext };
