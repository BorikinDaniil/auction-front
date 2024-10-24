import { $axios } from '@services/axios';
import { CategoriesApi}  from '@Types/api';

const categoriesApi: CategoriesApi = {
  getCategories(params) {
    return $axios.get('/categories', { params });
  },
};

export default categoriesApi;
