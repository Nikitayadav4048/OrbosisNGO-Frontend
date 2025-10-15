// API Configuration
import axios from 'axios';

export const IP = `${import.meta.env.VITE_API_BASE_URL}`;

// Create axios instance
const api = axios.create({
  baseURL: IP,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Silent error handling - errors will be handled by individual components
    return Promise.reject(error);
  }
);

export default api;
