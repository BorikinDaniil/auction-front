import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import auctionReducer from './auctinSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    auction: auctionReducer,
  },
});