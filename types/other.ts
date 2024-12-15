import store from '@store/index';

export type UIModule = {
  isMobile: boolean;
  isTablet: boolean;
};

export type RootState = ReturnType<typeof store.getState>;
