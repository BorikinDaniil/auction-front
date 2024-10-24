import { $axios } from '@services/axios';
// Types
import { UserApi } from '@Types/api';

const userApi: UserApi = {
  registration(payload) {
    return $axios.post('/registration', payload);
  },

  login(payload) {
    return $axios.post('/login', payload);
  },

  getCurrentUser() {
    return $axios.get('/user/me');
  },
};

export default userApi;
