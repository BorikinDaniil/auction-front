import { getToken, removeCookie } from '@utils/cookies';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext } from 'next';
import Router from 'next/router';

const accessToken = getToken();
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
  const token = accessToken || context?.req?.cookies?.accessToken;
  const newConfig = { ...config };

  if (token) {
    newConfig.headers.Authorization = `Bearer ${token}`;
  }

  return newConfig;
});

$axios.interceptors.response.use(
  response => response,
  async(error: AxiosError) => {
    // check conditions to refresh token
    if (error.response?.status === 401) {
      if (context?.res?.setHeader) {
        context.res.setHeader('Set-Cookie', ['accessToken=""; Max-Age=0']);
      }

      removeCookie('accessToken');

      if (typeof window !== 'undefined') {
        await Router.push('auth/login');

        return;
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
