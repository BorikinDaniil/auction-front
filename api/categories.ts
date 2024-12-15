import { $axios } from '@services/axios';
import { CategoriesApi } from '@Types/api';

const categoriesApi: CategoriesApi = {
  getCategories(params) {
    return $axios.get('/categories', { params });
  },

  getSubCategories(params) {
    return $axios.get('/sub-categories', { params });
  },
};

export default categoriesApi;
