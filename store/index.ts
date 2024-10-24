import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import auctionReducer from './auctinSlice';
import uiSlice from './uiSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    auction: auctionReducer,
    ui: uiSlice,
  },
  devTools: true,
});
