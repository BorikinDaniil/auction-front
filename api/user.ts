import { $axios } from '../services/axios';

const userApi: { [key: string]: any } = {
  registration(payload: object): Promise<object> {
    return $axios.post('/registration', payload);
  },

  login(payload: object): Promise<object> {
    return $axios.post('/login', payload);
  },

  getCurrentUser(): Promise<object> {
    return $axios.get('/user/me');
  },
};

export default userApi;