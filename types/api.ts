import { AuctionsData, AuctionsFilter } from './auctions';
import { AxiosResponse } from 'axios';
import { CategoriesList, CategoryParams, SubCategories } from './categories';
import { User, UserLogin, UserRegistration } from '@Types/user';
import { TwoNumbersArray } from '@Types/common';

type AuctionsResponse = AxiosResponse & {
  data: {
    auctionsData: AuctionsData;
    limitPrices: TwoNumbersArray;
  };
};

type CategoriesResponse = AxiosResponse & {
  data: CategoriesList;
};

type SubCategoriesResponse = AxiosResponse & {
  data: SubCategories;
};

type AuthResponse = AxiosResponse & {
  data: {
    token: string;
    user: User;
  };
};

type UserResponse = AxiosResponse & {
  data: User;
};

type auctionsParams = AuctionsFilter & {
  page?: number;
  pageSize?: number;
};

export type AuctionApi = {
  getAuctions: (
    params?: auctionsParams,
  ) => Promise<AuctionsResponse | undefined>;

  createAuction: (payload: FormData) => Promise<AuctionsResponse | undefined>;
};

export type CategoriesApi = {
  getCategories: (
    params?: CategoryParams,
  ) => Promise<CategoriesResponse | undefined>;

  getSubCategories: (
    params?: CategoryParams,
  ) => Promise<SubCategoriesResponse | undefined>;
};

export type UserApi = {
  registration: (
    payload: UserRegistration,
  ) => Promise<AuthResponse | undefined>;

  login: (payload: UserLogin) => Promise<AuthResponse | undefined>;

  getCurrentUser: () => Promise<UserResponse | undefined>;
};
