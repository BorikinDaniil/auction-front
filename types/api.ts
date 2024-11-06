import { AuctionData, AuctionParams } from './auctions';
import { AxiosResponse } from 'axios';
import { CategoriesList, CategoryParams } from './categories';
import { User, UserLogin, UserRegistration } from '@Types/user';


type AuctionsResponse = AxiosResponse & {
    data: AuctionData[];
}

type CategoriesResponse = AxiosResponse & {
    data: CategoriesList;
}

type AuthResponse = AxiosResponse & {
    data: {
        token: string;
        user: User;
    }
}

type UserResponse = AxiosResponse & {
    data: User
}

export type AuctionApi = {
    getAuctions: (params?: AuctionParams) => Promise<AuctionsResponse | undefined>;

    createAuction: (payload: FormData) => Promise<AuctionsResponse | undefined>;
}

export type CategoriesApi = {
    getCategories: (params?: CategoryParams) => Promise<CategoriesResponse | undefined>;
}

export type UserApi = {
    registration: (payload: UserRegistration) => Promise<AuthResponse| undefined>;

    login: (payload: UserLogin) => Promise<AuthResponse| undefined>;

    getCurrentUser: () => Promise<UserResponse | undefined>
}