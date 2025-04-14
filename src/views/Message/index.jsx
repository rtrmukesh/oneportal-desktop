import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';

const Message = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);

  return (
    <div className="app">
      {/* Sidebar (Left) */}
      <Sidebar setSelectedChannel={setSelectedChannel} />

      {/* Chat Window (Right) */}
      <ChatWindow selectedChannel={selectedChannel} />
    </div>
  );
};

export default Message;
