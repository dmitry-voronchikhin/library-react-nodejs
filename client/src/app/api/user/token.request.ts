import axios, { AxiosResponse } from 'axios';

import { BASE_API_URL } from '..';
import { TokensResponse } from '../types';

export const tokenRequest = {
  refresh: async (): Promise<AxiosResponse<TokensResponse>> => {
    const response = await axios.get(`${BASE_API_URL}/user/refresh`, {
      withCredentials: true,
    });
    return response;
  },
};
