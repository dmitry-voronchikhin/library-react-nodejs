import axios from 'axios';

const BASE_API_URL = 'http://localhost:5000/api';

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_API_URL,
});

api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});

export { api };
