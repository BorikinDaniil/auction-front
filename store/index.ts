import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import auctionReducer from './auctinSlice';
import uiSlice from './uiSlice';
import categoriesSlice from './categoriesSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    auctions: auctionReducer,
    ui: uiSlice,
    categories: categoriesSlice,
  },
  devTools: true,
});
