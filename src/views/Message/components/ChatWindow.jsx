import React from 'react';

const ChatWindow = ({ selectedChannel }) => {
  if (!selectedChannel) {
    return <div className="chat-window">Select a channel to start chatting.</div>;
  }

  return (
    <div className="chat-window">
      <h2>Chat for {selectedChannel?.channel_name}</h2>
      {/* Display Messages for the Selected Channel */}
      <div className="messages">
        <div className="message">
          <strong>John</strong>: Hello, anyone there?
        </div>
        <div className="message">
          <strong>Jane</strong>: Yes, I’m here!
        </div>
      </div>

      {/* Message Input */}
      <div className="message-input">
        <input type="text" placeholder="Type a message..." />
      </div>
    </div>
  );
};

export default ChatWindow;
