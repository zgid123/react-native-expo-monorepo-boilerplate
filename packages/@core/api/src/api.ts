import Axios from 'axios';
import queryString from 'query-string';
import { deepSnakeizeKeys } from '@core/utils/objectUtils';
import { isEmpty, isNullish, omitBy } from '@core/utils/remeda';

import type { AsyncStorageStatic } from '@react-native-async-storage/async-storage';

import { AuthService } from './AuthService';
import { parseData, parseError } from './helpers';

import type {
  TObject,
  TGetParams,
  IRequestBody,
  IRequestProps,
  IOptionsParams,
  IOptionsResult,
  IRequestParams,
} from './interface';

interface IConfigurationProps {
  baseUrl?: string;
  version?: number;
  skipVersion?: boolean;
  requiredAuth?: boolean;
  raiseApiEvent?: boolean;
  storage?: AsyncStorageStatic;
}

export class Api {
  protected _version: number = 1;
  protected _apiEndpoint: string;
  protected _skipVersion: boolean;
  protected _raiseApiEvent: boolean;
  protected _authService: typeof AuthService;
  protected _requiredAuth: boolean | undefined;

  private constructor({
    baseUrl,
    storage,
    version = 1,
    requiredAuth,
    skipVersion = false,
    raiseApiEvent = false,
  }: IConfigurationProps) {
    this._version = version;
    this._authService = AuthService;
    this._skipVersion = skipVersion;
    this._apiEndpoint = baseUrl || '';
    this._requiredAuth = requiredAuth;
    this._raiseApiEvent = raiseApiEvent;

    this._authService.config({
      storage,
    });
  }

  public static create(params: IConfigurationProps = {}): Api {
    return new this(params);
  }

  protected async _options({
    requiredAuth,
    headers = {},
  }: IOptionsParams): Promise<IOptionsResult> {
    let options = {} as IOptionsResult;
    const authToken = await this._authService?.token();

    if (requiredAuth && authToken) {
      options = {
        ...options,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
    }

    options.headers = {
      ...(options.headers as TObject),
      ...headers,
    };

    return options;
  }

  protected async _request<T>({
    data,
    params,
    signal,
    headers,
    endpoint,
    version = 1,
    method = 'get',
    onUploadProgress,
    isExternal = false,
    requiredAuth = true,
    skipVersion = false,
    transform = 'snake',
  }: IRequestProps & IRequestBody & IRequestParams): Promise<T> {
    if (typeof endpoint !== 'string') {
      endpoint = queryString.stringifyUrl(
        {
          url: endpoint.url,
          query: omitBy(endpoint.query as TAny, (val) => isNullish(val)),
        },
        {
          arrayFormat: 'bracket',
        },
      );
    }

    let url = endpoint.replace(/^\//, '');

    if (transform === 'snake') {
      data = deepSnakeizeKeys(data);
    }

    if (!isExternal) {
      url = [
        this._apiEndpoint,
        !(this._skipVersion || skipVersion)
          ? `v${version || this._version}`
          : '',
        url,
      ]
        .filter((s) => !!s)
        .join('/');
    }

    const opts = await this._options({
      headers,
      requiredAuth: isNullish(this._requiredAuth)
        ? requiredAuth
        : this._requiredAuth,
    });

    const promise = Axios.request({
      ...omitBy(
        {
          url,
          data,
          params,
          method,
        },
        (value) => isEmpty(value as TAny),
      ),
      ...opts,
      signal,
      onUploadProgress,
    })
      .then(parseData)
      .catch(
        parseError({
          raiseApiEvent: this._raiseApiEvent,
        }),
      );

    return promise;
  }

  public get<T>(options: TGetParams): Promise<T> {
    return this._request<T>({ method: 'get', ...options });
  }

  public post<T>(
    options: Omit<IRequestProps, 'method'> & IRequestBody,
  ): Promise<T> {
    return this._request<T>({ method: 'post', ...options });
  }

  public put<T>(
    options: Omit<IRequestProps, 'method'> & IRequestBody,
  ): Promise<T> {
    return this._request<T>({ method: 'put', ...options });
  }

  public delete<T>(
    options: Omit<IRequestProps, 'method'> & IRequestBody,
  ): Promise<T> {
    return this._request<T>({ method: 'delete', ...options });
  }
}
