import axios from "axios";
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";

// Base API configuration
const API_URL = "http://localhost:8080/api";

// Create axios instance with base URL
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensures cookies are sent with every request
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // If config doesn't exist or error isn't from a request, reject immediately
    if (!error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // If error is 401 (Unauthorized) and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to get a new access token using refresh token
        // The httpOnly cookie with refresh token will be automatically sent with this request
        const response = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          {
            withCredentials: true, // Ensures cookies are sent with the request
          }
        );

        const { accessToken } = response.data;

        // Store the new access token
        localStorage.setItem("accessToken", accessToken);

        // Retry the original request with new access token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh token is invalid, logout the user
        localStorage.removeItem("accessToken");
        // Note: The refresh token is in an httpOnly cookie that we can't access directly
        // The backend should clear the refresh token cookie when there's an auth error

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
