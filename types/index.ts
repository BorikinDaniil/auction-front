export interface IUser {
  id?: string
  username: string
  email: string
  gender: number
}
export interface IUserRegistration extends IUser {
  password: string
  passwordConfirm: string
}

export interface IErrors {
  errors: {
    [key: string]: string
  };
}
