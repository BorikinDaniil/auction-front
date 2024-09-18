import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuctionsList } from '../types/auctions';

type AuctionsState = {
  auctions: AuctionsList
}

const getInitialState = (): AuctionsState => ({
  auctions: [],
});

const auctionSlice = createSlice({
  name: 'auction',
  initialState: getInitialState(),
  reducers: {
    setAuctionsList(state, action:PayloadAction<AuctionsList>) {
      state.auctions = action.payload;
    },
  },
});

export const { setAuctionsList } = auctionSlice.actions;

export default auctionSlice.reducer;