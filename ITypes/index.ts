import store from '@store/index';
// import { Store } from 'redux';
// import {GetServerSidePropsContext, NextPageContext} from 'next';
// import * as http from 'http';

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

// interface INextReq extends http.IncomingMessage {
//   cookies?: {
//     [key: string]: string,
//   },
// }
//
// type NextReq = INextReq| undefined
//
// export interface IMyPageContext extends NextPageContext {
//   store?: Store;
//   req?: NextReq,
// }
//
// export type MyPageContext = IMyPageContext | GetServerSidePropsContext

export type IRootState = ReturnType<typeof store.getState>
