import { User } from './user';

export type Auction = {
  image : string;
  startAt: string;
  endAt: string;
  productDescription: string;
  productName: string;
  startPrice: number;
  step: number;
  video: string;
  owner: User;
}

export type AuctionsList = Auction[] | []