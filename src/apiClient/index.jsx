import axios from "axios";
import { API_URL } from "../configs";
import { HttpStatus } from "../Helper/HttpStatus";
import EStore from "../lib/EStore";
import { SESSION_TOKEN } from "../Helper/EStore";

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 50000,
  headers: {
  },
});

// Set token dynamically before each request
apiClient.interceptors.request.use(async (config) => {
  const token = await EStore.getItem(SESSION_TOKEN);
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === HttpStatus.UNAUTHORIZED) {
      // logOut()
    }
    if (error.response?.status === HttpStatus.NOT_FOUND) {
      // pageNotFound()
    }
    return Promise.reject(error);
  }
);
