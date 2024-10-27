import EventEmitter from 'eventemitter3';

import type { IConfirmProps, TModalKey } from './interface';

export interface IConfirmModalEventProps {
  confirm: (params?: IConfirmProps & { modalKey?: TModalKey }) => void;
}

export const confirmModalEvent = new EventEmitter<IConfirmModalEventProps>();
