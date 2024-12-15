import { Pagination } from '@Types/common';

type AuctionOwner = {
  id: number;
  profile: {
    username: string;
  };
};

export type Auction = {
  image: string;
  startAt: string;
  endAt: string;
  productDescription: string;
  productName: string;
  startPrice: number;
  step: number;
  video: string;
  owner: AuctionOwner;
};

enum AuctionStatus {
  awaiting = 1,
  started,
  finished,
}

export type AuctionData = Auction & {
  status: AuctionStatus;
  id: number;
};

export type AuctionsList = AuctionData[] | [];

export type AuctionsFilter = {
  productName?: string;
  subCategories?: string[];
  status?: AuctionStatus | string;
  startAtFrom?: string;
  startAtTo?: string;
  endAtFrom?: string;
  endAtTo?: string;
  page?: number;
  priceFrom: number;
  priceTo: number;
};

export type AuctionsData = {
  auctions: AuctionData[];
  pagination: Pagination;
};
