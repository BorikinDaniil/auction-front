import dayjs from 'dayjs';
// Types
import { DateValue } from '@Types/form';

export const formatToTimeStamp = (date: DateValue | null): string => {
  if (!date) return '';

  return dayjs(date).format('YYYY-MM-DD HH:mmZ');
};

export const formatToDate = (
  date: string | undefined,
  format: string = 'YYYY-MM-DD HH:mmZ',
): DateValue => {
  if (!date) return null;

  return dayjs(date, format);
};
