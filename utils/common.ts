import { RouterQuery, StringOrNumber } from '@Types/common';
import { isEmpty } from 'lodash';

export const mapArrayValues = (array: StringOrNumber[]) => {
  return array.map(item => (typeof item === 'number' ? String(item) : item));
};

export const transformValuesToString = (rawQuery: RouterQuery) => {
  return Object.entries(rawQuery).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: Array.isArray(value) ? mapArrayValues(value) : String(value),
    }),
    {},
  );
};
/* eslint-disable-next-line */
export const getFilteredObj = (obj: { [key: string]: any }): object => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const value = obj[key];
      if ((typeof value === 'object' && !isEmpty(value)) || value) {
        acc[key] = value;
      }

      return acc;
    },
    /* eslint-disable-next-line */
    {} as { [key: string]: any },
  );
};
