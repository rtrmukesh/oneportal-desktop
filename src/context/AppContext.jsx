import React, { createContext, useContext, useState } from 'react';
import MessagesService from '../services/MessagesService';
import ChannelMessagesService from '../services/ChannelMessagesService';

// Create the context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [dirMessages, setDirMessages] = useState([]);
  const [channalMessageList, setChannalMessageList] = useState([])


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

  let getChannalMessage = async (channel=null) => {
    let response = await ChannelMessagesService.search({
      channel_id: channel ? channel?.channel_id: selectedChannel?.channel_id,
    });
    let data = response && response?.data;
    setChannalMessageList(data)
  }


  return (
    <AppContext.Provider
      value={{
        selectedChannel,
        setSelectedChannel,
        selectedUser,
        setSelectedUser,
        getChannalMessage,
        getDirectMessage,
        dirMessages,
        setDirMessages,
        channalMessageList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier usage
export const useAppContext = () => useContext(AppContext);
