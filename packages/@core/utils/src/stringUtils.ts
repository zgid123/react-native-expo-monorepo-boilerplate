interface ICombineOptionsProps {
  trim?: boolean;
  joinWith: string;
}

function compact(source: (string | undefined)[]): string[] {
  return source.filter((s) => !!s) as string[];
}

export function combine(
  opts: ICombineOptionsProps | string | undefined = '',
  ...params: (string | undefined)[]
): string {
  let options: ICombineOptionsProps = { joinWith: ' ' };

  if (opts && typeof opts === 'object') {
    options = opts;
  } else {
    params = [opts, ...params];
  }

  const { joinWith, trim } = options;
  let compactedValue = compact(params);

  if (trim) {
    compactedValue = compactedValue.map((s) => s.trim());
  }

  return compactedValue.join(joinWith);
}

export function camelize(str: string): string {
  return str?.replace(/^([A-Z])|[\s-_/]+(\w)/g, (_match, p1, p2) => {
    if (p2) {
      return p2.toUpperCase();
    }

    return p1.toLowerCase();
  });
}

export function snakeize(str: string): string {
  if (!str || !str.length) {
    return str;
  }

  return combine(
    { joinWith: '' },
    str.charAt(0).toLowerCase(),
    str.slice(1).replace(/[A-Z]/g, (match) => {
      return `_${match.toLowerCase()}`;
    }),
  );
}
