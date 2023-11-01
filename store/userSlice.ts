import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@ITypes/index';

type UserState = {
  userInfo: User
}

const getInitialState = (): UserState => ({
  userInfo: null,
});

const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers: {
    setUserInfo(state, action:PayloadAction<User>) {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;