type AuctionOwner = {
  id: number;
  profile: {
    username: string;
  }
}

export type Auction = {
  image : string;
  startAt: string;
  endAt: string;
  productDescription: string;
  productName: string;
  startPrice: number;
  step: number;
  video: string;
  owner: AuctionOwner;
}

enum AuctionStatus {
  awaiting = 1,
  started,
  finished,
}

export type AuctionData = Auction & {
  status: AuctionStatus;
  id: number;
}

export type AuctionParams = {
  productName?: string;
}

export type AuctionsList = AuctionData[] | []