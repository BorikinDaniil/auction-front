import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Types
import { SubCategories } from '@Types/categories';

type State = {
  subcategories: SubCategories;
};

const getInitialState = (): State => ({
  subcategories: [],
});

const categoriesSlice = createSlice({
  name: 'auction',
  initialState: getInitialState(),
  reducers: {
    setSubcategoriesList(state, action: PayloadAction<SubCategories>) {
      state.subcategories = action.payload;
    },
  },
});

export const { setSubcategoriesList } = categoriesSlice.actions;

export default categoriesSlice.reducer;
