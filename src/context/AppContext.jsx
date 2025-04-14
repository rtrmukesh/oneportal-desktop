import React, { createContext, useContext, useState } from 'react';
import MessagesService from '../services/MessagesService';

// Create the context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [dirMessages, setDirMessages] = useState([])


  const getDirectMessage = async (inReceiverId=null) => {
    try {
      // setIsLoading(true);
  
      const response = await MessagesService.getMessages(inReceiverId ? inReceiverId :selectedUser?.id);
      const { receiverMessages = [], senderMessages = [] } = response?.data || {};
  
      const formatMessages = (messages, isSender) =>
        messages.map(({ message, timestamp, id, media_url, read_at }) => ({
          message,
          isSender,
          timestamp: new Date(timestamp).getTime(),
          id,
          media_url,
          ...(isSender && { read_at }), 
        }));
  
      const allMessages = [
        ...formatMessages(receiverMessages, false),
        ...formatMessages(senderMessages, true),
      ].sort((a, b) => a.timestamp - b.timestamp);
  
      setDirMessages(allMessages);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  let getChennalMessage =()=>{

  }


  return (
    <AppContext.Provider
      value={{
        selectedChannel,
        setSelectedChannel,
        selectedUser,
        setSelectedUser,
        getChennalMessage,
        getDirectMessage,
        dirMessages
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier usage
export const useAppContext = () => useContext(AppContext);
