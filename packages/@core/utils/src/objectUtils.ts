import { isDate, isObjectType } from 'remeda';

import { camelize, snakeize } from './stringUtils';

export function pick<T extends object, TKeys extends Array<keyof T>>(
  obj: T,
  keys: TKeys,
): Pick<T, TKeys[number]> {
  return keys.reduce<Pick<T, TKeys[number]>>(
    (result, key) => {
      result[key] = obj[key];

      return result;
    },
    {} as Pick<T, TKeys[number]>,
  );
}

export function omit<T extends object, TKeys extends Array<keyof T>>(
  obj: T,
  keys: TKeys,
): Pick<T, TKeys[number]> {
  return Object.entries(obj).reduce(
    (result, element) => {
      const [key, value] = element as unknown as [TKeys[number], TAny];

      if (keys.includes(key)) {
        return result;
      }

      result[key] = value;

      return result;
    },
    {} as Pick<T, TKeys[number]>,
  );
}

function deepLookup(data: TAny, formatFunc: (str: string) => string): TAny {
  if (Array.isArray(data)) {
    return data.map((datumn) => {
      return deepLookup(datumn, formatFunc);
    });
  }

  if (isDate(data) || !isObjectType(data) || data instanceof File) {
    return data;
  }

  return Object.entries(data).reduce((result, [k, v]) => {
    let value;

    if (isDate(v) || !isObjectType(v)) {
      value = v;
    } else {
      value = deepLookup(v, formatFunc);
    }

    Object.assign(result, {
      [formatFunc(k)]: value,
    });

    return result;
  }, {});
}

export function deepCamelizeKeys(data: TAny): TAny {
  return deepLookup(data, camelize);
}

export function deepSnakeizeKeys(data: TAny): TAny {
  return deepLookup(data, snakeize);
}
