import { RootState } from '@Types/other';

export const selectIsDesktop = (state: RootState) =>
  !(state.ui.isMobile || state.ui.isTablet);
