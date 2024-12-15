import store from '@store/index';

export type User = {
  id: string;
  username: string;
} | null;

export type UserPayload = {
  email: string;
  username: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegistration = {
  password: string;
  passwordConfirm: string;
} & UserPayload;

export type Errors = {
  errors: {
    [key: string]: string;
  };
};
