import type { AxiosRequestConfig } from 'axios';

export type TObject = Record<string, TAny>;

interface IEndpointProps {
  url: string;
  query?: {
    [key: string]: string | number | Array<string | number> | undefined;
  };
}

export type TEndpoint = string | IEndpointProps;

export interface IOptionsParams {
  requiredAuth: boolean;
  headers?: AxiosRequestConfig['headers'];
}

export interface IOptionsResult {
  [key: string]: string | boolean | TObject;
}

export interface IRequestProps {
  version?: number;
  endpoint: TEndpoint;
  isExternal?: boolean;
  skipVersion?: boolean;
  requiredAuth?: boolean;
  transform?: 'camel' | 'snake';
  headers?: AxiosRequestConfig['headers'];
  method: 'get' | 'post' | 'put' | 'delete';
}

export interface IRequestBody {
  data?: TObject;
  onUploadProgress?: AxiosRequestConfig['onUploadProgress'];
}

export interface IRequestParams {
  params?: TObject;
  signal?: AxiosRequestConfig['signal'];
}

export type TGetParams = IRequestParams &
  Exclude<Omit<IRequestProps, 'method'>, IRequestBody>;

export interface IErrorDataProps {
  code: number;
  status: number;
  detail?: string;
  message: string;
}

export interface IErrorProps extends IErrorDataProps {
  name: string;
  isNetworkError: boolean;
}

export interface IApiRequestProps {
  signal?: AxiosRequestConfig['signal'];
}

export interface IParseErrorOptionsProps {
  raiseApiEvent: boolean;
}
