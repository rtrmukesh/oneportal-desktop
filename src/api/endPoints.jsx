import { API_URL } from "../configs";

const appApi = (path) => `${API_URL}/${path}`;

// API call routes
export const endpoints = () => ({
  userAPI: appApi("user/v1"),
});
