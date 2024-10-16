import { $axios } from '../services/axios';
import { AuctionApi } from "../types/api";

const auctionApi: AuctionApi = {
  getAuctions(params) {
    return $axios.get('/auctions', { params });
  },

  createAuction(payload) {
    return $axios.post('/auctions', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
};

export default auctionApi;