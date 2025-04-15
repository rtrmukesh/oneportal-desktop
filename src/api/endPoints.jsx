import { API_URL } from "../configs";

const appApi = (path) => `${API_URL}/${path}`;

// API call routes
export const endpoints = () => ({
  userAPI: appApi("user/v1"),
  MessageChannelApi: appApi("v1/messageChannel"),
  messageAPI: appApi("v1/message"),
  channelMessageAPI: appApi("v1/channelMessage"),
});
