import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export const getToken = () => {
  return getCookie('accessToken');
};

export const setCookies = (name: string, value: string) => {
  setCookie(name, value);
};

export const removeCookie = (name: string = 'accessToken') => {
  deleteCookie(name);
};

export const isAuthenticated = () => {
  return Boolean(getToken());
};
