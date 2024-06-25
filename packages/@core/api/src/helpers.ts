import { deepCamelizeKeys } from '@core/utils/objectUtils';

import type { AxiosError, AxiosResponse } from 'axios';

import { apiEvent } from './event';

import type {
  IErrorProps,
  IErrorDataProps,
  IParseErrorOptionsProps,
} from './interface';

export function parseData({ data }: AxiosResponse): TAny {
  const hasDataWrapper = Object.prototype.hasOwnProperty.call(data, 'data');

  if (hasDataWrapper) {
    return deepCamelizeKeys(data.data);
  }

  return deepCamelizeKeys(data);
}

export function parseError({
  raiseApiEvent,
}: IParseErrorOptionsProps): (error: AxiosError) => Promise<IErrorProps> {
  return (error: AxiosError): Promise<IErrorProps> => {
    const { name, message, response } = error;
    const { data } = (response || {}) as { data: IErrorDataProps };
    const isNetworkError = name === 'Error' && message === 'Network Error';
    const { status, code } = data;

    if (raiseApiEvent && status === 401 && code === 20_000) {
      apiEvent.emit('unauthenticated', data);
    }

    return Promise.reject({
      name,
      isNetworkError,
      ...data,
    });
  };
}
