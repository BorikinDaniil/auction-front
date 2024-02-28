import { $axios } from '../services/axios';

const auctionApi: { [key: string]: any } = {
  createAuction(payload: object): Promise<object> {
    return $axios.post('/auctions', payload, {headers: { 'Content-Type': 'multipart/form-data' }});
  },
};

export default auctionApi;