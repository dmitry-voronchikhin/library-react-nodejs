import axios from 'axios';

import { tokenRequest } from './user/token.request';

export const BASE_API_URL = 'http://localhost:5000/api';

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_API_URL,
});

api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`;
  }
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      await tokenRequest.refresh();

      return api.request(originalRequest);
    }

    throw error;
  },
);

export { api };
