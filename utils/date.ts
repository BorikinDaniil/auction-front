import dayjs from 'dayjs';
import {DateValue} from '@ITypes/form';

export const formatToTimeStamp = (date: DateValue) => {
  if (!date) return '';

  return dayjs(date).format('YYYY-MM-DD HH:mmZ');
};
