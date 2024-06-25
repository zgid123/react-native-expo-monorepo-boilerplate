import EventEmitter from 'eventemitter3';

import type { IErrorDataProps } from './interface';

interface IApiEventProps {
  unauthenticated: (params: IErrorDataProps) => void;
}

export const apiEvent = new EventEmitter<IApiEventProps>();
