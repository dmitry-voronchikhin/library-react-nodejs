import { AxiosResponse } from 'axios';

import { api } from '..';
import { LoginResponse } from '../types';

export const userRequest = {
  login: async (
    email: string,
    password: string,
  ): Promise<AxiosResponse<LoginResponse>> => {
    return api.post<LoginResponse>('/user/login', { email, password });
  },
  logout: async (): Promise<AxiosResponse> => {
    return api.get('/user/logout');
  },
};
