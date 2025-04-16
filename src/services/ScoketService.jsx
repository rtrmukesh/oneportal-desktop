import { io } from "socket.io-client";
import { API_URL } from "../configs";

let socket = null;
let currentUserId = null;

const defaultOptions = {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 2000,
};

export const connectSocket = (userId) => {
  if (!userId) {
    console.warn("connectSocket: userId is required.");
    return null;
  }

  // Prevent reconnect for same userId
  if (socket && socket.connected && currentUserId === userId) {
    console.log("connectSocket: already connected.");
    return socket;
  }

  // Disconnect any existing socket first
  if (socket) {
    socket.disconnect();
    socket = null;
    currentUserId = null;
  }

  // Create new socket
  try {
    socket = io(API_URL, defaultOptions);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      currentUserId = userId;
      socket.emit("join", userId);
    });

    socket.on("disconnect", (reason) => {
      console.warn("Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    socket.on("reconnect_attempt", () => {
      console.log("Attempting to reconnect...");
    });

    return socket;
  } catch (err) {
    console.error("connectSocket failed:", err);
    return null;
  }
};

export const getSocketInstance = () => {
  if (!socket || !socket.connected) {
    console.warn("getSocketInstance: No active connection.");
    return null;
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    currentUserId = null;
    console.log("Socket manually disconnected.");
  }
};
