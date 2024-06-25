import { format as fnsFormat, isFuture, isSameDay, toDate } from 'date-fns';

export * from 'date-fns';

interface IOptionsProps {
  format?: string;
  defaultValue?: string;
}

export function parseDate(date: string | Date | null | undefined): Date {
  if (!date) {
    return new Date();
  }

  if (typeof date === 'string') {
    return toDate(Date.parse(date));
  }

  return date;
}

export function formatDate(
  value: string | Date | null | undefined,
  opts: IOptionsProps = {},
): string {
  const { format = 'dd-MM-yyyy', defaultValue = '' } = opts;

  if (!value) {
    return defaultValue;
  }

  return fnsFormat(parseDate(value), format);
}

export function isTodayOrFuture(date: Date | string): boolean {
  date = parseDate(date);

  return isSameDay(date, new Date()) || isFuture(date);
}
