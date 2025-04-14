import React from "react";
import { useAppContext } from "../../../context/AppContext";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";

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

      <div className="messages">
        {dirMessages.map((msg, index) => {
          return (
            <div
              key={index}
              className={`message ${msg.isSender ? "own-message" : "other-message"}`}
            >
              {/* Render image if media_url exists */}
              {msg.media_url && (
                <img src={msg.media_url} alt="media" className="message-image" />
              )}

              {/* Render message text if available */}
              {msg.message && (
                <div className="message-content" dangerouslySetInnerHTML={{ __html: msg.message }} />
              )}

              <div className="message-sender">{msg.sender}</div>
            </div>
          );
        })}
      </div>


      <MessageInput handleFileChange={handleFileChange} />
    </div>
  );
};

export default ChatWindow;
