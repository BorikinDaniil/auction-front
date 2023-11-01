import axios, { AxiosError } from 'axios';
import { FormInstance } from 'antd/es/form';
import { IErrors } from '@ITypes/index';
import { isEmpty } from 'lodash';

export const addFormError = (form: FormInstance, error: AxiosError<IErrors>) => {
  const errors = error?.response?.data?.errors;

  if (!errors || isEmpty(errors)) return;

  const fields: String[] = Object.keys(errors);


  const formErrors = fields.map(field => ({
    name: field,
    // @ts-ignore
    errors: [errors[field]],
  }));


  form.setFields(formErrors);
};

export const handleError = (form: FormInstance, e: any) => {
  const error = e as Error | AxiosError;

  if (axios.isAxiosError<IErrors>(error)){
    addFormError(form, e);
  }
};
