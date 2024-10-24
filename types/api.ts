import { Auction, AuctionParams } from './auctions';
import { AxiosResponse } from 'axios';
import { CategoriesList, CategoryParams } from './categories';
import { User, UserLogin, UserRegistration } from '@Types/user';


type AuctionsResponse = AxiosResponse & {
    data: Auction[];
}

type CategoriesResponse = AxiosResponse & {
    data: CategoriesList;
}

type Authesponse = AxiosResponse & {
    data: {
        token: string;
        user: User;
    }
}

type UserRespose = AxiosResponse & {
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
    registration: (payload: UserRegistration) => Promise<Authesponse| undefined>;

    login: (payload: UserLogin) => Promise<Authesponse| undefined>;

    getCurrentUser: () => Promise<UserRespose | undefined>
}