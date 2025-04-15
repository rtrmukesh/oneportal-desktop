import React from "react";
import { useAppContext } from "../../../context/AppContext";
import ChatHeader from "./ChatHeader";
import ChatList from "./ChatList";
import MessageInput from "./MessageInput";

const ChatWindow = () => {
  const { selectedUser, selectedChannel, dirMessages } = useAppContext();



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };


  if (!selectedChannel && !selectedUser) {
    return (
      <div className="chat-window">Select a channel to start chatting.</div>
    );
  }


  return (
    <div className="chat-window">
      <ChatHeader channelName={selectedChannel?.channel_name} userName={selectedUser} />
      <ChatList dirMessages={dirMessages} />
      <MessageInput handleFileChange={handleFileChange}  />
    </div>
  );
};

export default ChatWindow;
