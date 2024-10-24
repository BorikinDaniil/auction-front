import { RootState } from '@Types/user';

export const selectIsDesktop = (state: RootState) => !(state.ui.isMobile || state.ui.isTablet);