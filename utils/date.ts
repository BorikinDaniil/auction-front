import dayjs from 'dayjs';
// Types
import { DateValue } from '@Types/form';

export const formatToTimeStamp = (date: DateValue): string => {
  if (!date) return '';

  return dayjs(date).format('YYYY-MM-DD HH:mmZ');
};
