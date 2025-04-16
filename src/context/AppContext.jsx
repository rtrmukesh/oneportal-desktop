import React, { createContext, useContext, useState } from 'react';
import MessagesService from '../services/MessagesService';
import ChannelMessagesService from '../services/ChannelMessagesService';
import useNotificationSocket from '../sokect/useNotificationSocket';
import MessageChannelService from '../services/MessageChannelService';
import EStore from '../lib/EStore';
import { C_ID, S_ID } from '../Helper/EStore';

// Create the context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [dirMessages, setDirMessages] = useState([]);
  const [channalMessageList, setChannalMessageList] = useState([])
  const [channelList, setChannelList] = useState([])
  const [messageUserList, setMessageUserList] = useState([])



  const getDirectMessage = async (inReceiverId=null) => {
    let selectedId = await EStore.getItem(S_ID)
    try {
      // setIsLoading(true);
      const response = await MessagesService.getMessages(inReceiverId ? inReceiverId :selectedUser?.id  ? selectedUser?.id : selectedId);
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
    let selectedId = await EStore.getItem(C_ID)

    let response = await ChannelMessagesService.search({
      channel_id: channel ? channel?.channel_id: selectedChannel?.channel_id ? selectedChannel?.channel_id : selectedId,
    });
    let data = response && response?.data;
    setChannalMessageList(data)
  }

  const getChannelList = async () => {
    try {
      const response = await MessageChannelService.search();
      const data = response?.data?.data;
      setChannelList(data);
    } catch (err) {
      console.error("Channel list error:", err);
    }
  };


  const getMessageList = async () => {
    try {
      const response = await MessagesService.search();
      const data = response?.data?.data;
      setMessageUserList(data);
    } catch (err) {
      console.error("Message list error:", err);
    }
  };

  let paramValue={
    getChannelList, getMessageList, getDirectMessage, getChannalMessage
  }

  useNotificationSocket(paramValue)



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
        getChannelList,channelList,
        getMessageList,messageUserList
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier usage
export const useAppContext = () => useContext(AppContext);
