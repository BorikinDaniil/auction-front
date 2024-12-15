import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Types
import { User } from '@Types/user';

type UserState = {
  userInfo: User;
};

const getInitialState = (): UserState => ({
  userInfo: null,
});

const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers: {
    setUserInfo(state, action: PayloadAction<User>) {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
