import type { JSX, Component, ComponentType } from 'react';

export type AsProps<T, DefaultProps> = T extends undefined
  ? DefaultProps
  : T extends ComponentType<DefaultProps>
    ? DefaultProps
    : T extends Component<infer P>
      ? P
      : T extends ComponentType<infer P>
        ? P
        : T extends keyof JSX.IntrinsicElements
          ? JSX.IntrinsicElements[T]
          : DefaultProps;
