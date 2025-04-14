import axios from "axios";
import { API_URL } from "../configs";
import { HttpStatus } from "../Helper/HttpStatus";
import EStore from "../lib/EStore";
import { SESSION_TOKEN } from "../Helper/EStore";
export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    common: {
      Authorization: await EStore.getItem(SESSION_TOKEN),
    },
  },
});
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === HttpStatus.UNAUTHORIZED) {
      //   logOut()
    }
    if (error.response && error.response.status === HttpStatus.NOT_FOUND) {
      //   pageNotFound()
    }
    return Promise.reject(error);
  }
);
