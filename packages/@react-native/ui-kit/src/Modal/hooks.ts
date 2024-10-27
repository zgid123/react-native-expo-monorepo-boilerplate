import type { MutableRefObject } from 'react';

import type { IModalImperativeHandleProps } from './interface';

interface IUseModalReturnProps {
  open: () => void;
  close: () => void;
}

export function useModal(
  ref: MutableRefObject<IModalImperativeHandleProps>,
): IUseModalReturnProps {
  const close = () => {
    ref.current.close();
  };

  const open = () => {
    ref.current.open();
  };

  return {
    open,
    close,
  };
}
