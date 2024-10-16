import { Auction, AuctionParams } from './auctions';
import { AxiosResponse } from 'axios';
import { CategoriesList, CategoryParams } from './categories';

type AuctionsResponse = AxiosResponse & {
    data: Auction[];
}

type CategoriesResponse = AxiosResponse & {
    data: CategoriesList;
}

export type AuctionApi = {
    getAuctions: (params?: AuctionParams) => Promise<AuctionsResponse | undefined>;

    createAuction: (payload: FormData) => Promise<AuctionsResponse | undefined>;
}

export type CategoriesApi = {
    getCategories: (params?: CategoryParams) => Promise<CategoriesResponse | undefined>
}