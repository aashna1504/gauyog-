import axios from 'axios';
import useAuthStore from '../store/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://backend.gauyogkendr.com/api',
});

// Request interceptor to append access token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { refreshToken } = useAuthStore.getState();
        if (!refreshToken) throw new Error('No refresh token available');
        
        // Request a new access token
        const res = await axios.post('http://localhost:5000/api/auth/refresh', { refreshToken });
        
        // Update store with new access token
        useAuthStore.getState().setAccessToken(res.data.data.accessToken);
        
        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log the user out
        useAuthStore.getState().logout();
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }
    
    // Pass errors down to component
    return Promise.reject(error);
  }
);

export default api;
