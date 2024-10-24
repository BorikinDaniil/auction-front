import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Types
import { UIModule } from '@Types/other';

const getInitialState = (): UIModule => ({
  isMobile: false,
  isTablet: false,
});

const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers: {
    setIsMobile(state, data:PayloadAction<boolean>) {
      const { payload } = data;
      state.isMobile = payload;

      if (payload) state.isTablet = false;
    },
    setIsTablet(state, data:PayloadAction<boolean>) {
      const { payload } = data;
      state.isTablet = payload;

      if (payload) state.isMobile = false;
    },
  },
});

export const { setIsMobile, setIsTablet } = userSlice.actions;

export default userSlice.reducer;
