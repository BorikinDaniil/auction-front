export type NullableNumber = number | null;
export type TwoNumbersArray = [number, number];
export type StringOrNumber = number | string;

export type RouterQuery = {
  [key: string]: string | NullableNumber | StringOrNumber[];
};

export type Pagination = {
  page: number;
  total: number;
  pageSize: number;
};
