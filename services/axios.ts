import { getToken, removeCookie } from '../utils/cookies';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext } from 'next';
import Router from 'next/router';

let accessToken = getToken();
let context = <GetServerSidePropsContext>{};

export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api';

export const $axios = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

$axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  console.log('`context?.req?.cookies?.accessToken}`', context?.req?.cookies?.accessToken);
  const token = accessToken || context?.req?.cookies?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

$axios.interceptors.response.use(
  response => {
    return response;
  },
  async(error: AxiosError) => {
    // check conditions to refresh token
    if (error.response?.status === 401) {
      context.res.setHeader(
        'Set-Cookie', ['accessToken=""; Max-Age=0'],
      );

      removeCookie('accessToken');

      console.log('Router.push');
      await Router.push('auth/login');
    }
    return Promise.reject(error);
  },
);
