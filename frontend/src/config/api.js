import axios from "axios";

// Get the API URL from environment or use fallback
const getApiUrl = () => {
  // In production use the configured API URL or fallback to the Render host
  if (process.env.NODE_ENV === "production") {
    return process.env.REACT_APP_API_URL || "https://smart-rent-g3vd.onrender.com";
  }

  // In development use the CRA proxy when no explicit API URL is configured.
  // This keeps requests same-origin and makes cookies work correctly.
  return process.env.REACT_APP_API_URL || "";
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
  timeout: 30000,
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

    if (originalRequest?.url?.includes("/api/users/refresh")) {
      return Promise.reject(error);
    }

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

    if (process.env.NODE_ENV !== "production") {
      console.error("API Error Details:", {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    return Promise.reject(error);
  }
);

export default api;
