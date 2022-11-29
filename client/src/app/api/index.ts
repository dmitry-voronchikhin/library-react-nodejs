import axios from 'axios';

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
      const response = await axios.get(`${BASE_API_URL}/user/refresh`, {
        withCredentials: true,
      });
      sessionStorage.setItem('token', response.data.accessToken);

      return api.request(originalRequest);
    }

    throw error;
  },
);

export { api };
