import { AxiosResponse } from 'axios';

import { api } from '..';
import { LoginResponse } from '../types';

export const userRequest = {
  login: async (
    email: string,
    password: string,
  ): Promise<AxiosResponse<LoginResponse>> => {
    return await api.post<LoginResponse>('/user/login', { email, password });
  },
  logout: async (): Promise<AxiosResponse> => {
    return await api.get('/user/logout');
  },
};
