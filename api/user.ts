import { $axios } from '../services/axios';

// TODO: Find better ts solution
const userApi: { [key: string]: any } = {
  registration(payload: object): Promise<object> {
    return $axios.post('/registration', payload);
  },

  login(payload: object): Promise<object> {
    return $axios.post('/login', payload);
  },
};

export default userApi;