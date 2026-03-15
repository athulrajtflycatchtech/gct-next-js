import axios from "axios";
import { getAccessToken } from "./headerFunctions";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'
});
//automatically modify every outgoing API request before it is sent to the server
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Default content type
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response?.status === 401) {
      localStorage.clear();
      window.location.href = '/';
    }

    return Promise.reject(response || error);
  }
);

export default axiosInstance;
