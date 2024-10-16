import { $axios } from '../services/axios';
import { CategoriesApi}  from "../types/api";

const categoriesApi: CategoriesApi = {
  getCategories(params) {
    console.log('getAuctions')
    return $axios.get('/categories', { params })
  },
}

export default categoriesApi;