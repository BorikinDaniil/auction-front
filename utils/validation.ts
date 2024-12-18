import axios, { AxiosError } from 'axios';
// Utils
import { isEmpty } from 'lodash';
// Types
import { FormInstance } from 'antd/es/form';
import { Errors } from '@Types/user';

export const addFormError = (form: FormInstance, error: AxiosError<Errors>) => {
  const errors = error?.response?.data?.errors;

  if (!errors || isEmpty(errors)) return;

  const fields: string[] = Object.keys(errors);

  const formErrors = fields.map(field => ({
    name: field,
    errors: [errors[field]],
  }));

  form.setFields(formErrors);
};
/* eslint-disable-next-line */
export const handleError = (form: FormInstance, e: any) => {
  const error = e as Error | AxiosError;

  if (axios.isAxiosError<Errors>(error)) {
    addFormError(form, e);
  }
};
