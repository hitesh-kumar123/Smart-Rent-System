import axios from "axios";

// Get the API URL from environment or use fallback
const getApiUrl = () => {
  // Check if we're in production and environment variable is set
  if (process.env.NODE_ENV === "production" && process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  // Fallback to hardcoded URL for production
  if (process.env.NODE_ENV === "production") {
    return "https://smart-rent-g3vd.onrender.com";
  }

  // Development fallback
  return process.env.REACT_APP_API_URL || "http://localhost:8000";
};



// In-memory variable for the access token to keep it away from XSS
let accessToken = null;

// Helper to update the token (will be used by AuthContext)
export const setAccessToken = (token) => {
  accessToken = token;
};

// Create axios instance with default config
const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

// Add request interceptor to handle auth token
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors and silent refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const res = await axios.post(`${getApiUrl()}/api/users/refresh`, {}, { withCredentials: true });

        if (res.data && res.data.token) {
          accessToken = res.data.token;

          // Re-attach token and retry original request
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear token and local session
        accessToken = null;
        // Optionally redirect to login or emit event
        return Promise.reject(refreshError);
      }
    }

    console.error("API Error Details:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export default api;
