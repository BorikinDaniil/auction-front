import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Types
import { AuctionsData, AuctionsList } from '@Types/auctions';

type AuctionsState = {
  auctions: AuctionsList | null;
  filterLoading: boolean;
  pagination: {
    page: number;
    total: number;
    pageSize: number;
  };
};

const getInitialState = (): AuctionsState => ({
  auctions: null,
  filterLoading: false,
  pagination: {
    page: 1,
    total: 1,
    pageSize: 10,
  },
});

const auctionSlice = createSlice({
  name: 'auction',
  initialState: getInitialState(),
  reducers: {
    setAuctionsList(state, payload: PayloadAction<AuctionsData>) {
      state.auctions = payload.payload.auctions;
      state.pagination = payload.payload.pagination;
    },

    setAuctionFilterLoading(state, payload: PayloadAction<boolean>) {
      state.filterLoading = payload.payload;
    },
  },
});

export const { setAuctionsList, setAuctionFilterLoading } =
  auctionSlice.actions;

export default auctionSlice.reducer;
