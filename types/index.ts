export interface User {
  username: string
  email: string
  gender: number
}
export interface UserRegistration extends User {
  password: string
  passwordConfirm: string
}
