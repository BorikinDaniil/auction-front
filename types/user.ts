import store from '@store/index';

export interface IUser {
  username: string;
  email: string;
  gender: number;
}
export interface IUserRegistration extends IUser {
  password: string;
  passwordConfirm: string;
}

export interface IUserLogin {
  username: string;
  email: string;
}

export interface IErrors {
  errors: {
    [key: string]: string;
  };
}

export type User = {
  id: string;
  username: string;
  gender: number;
} | null;

export type IRootState = ReturnType<typeof store.getState>
