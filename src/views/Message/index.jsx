import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';

const Message = () => {

  return (
    <div className="app">
      {/* Sidebar (Left) */}
      <Sidebar />

      {/* Chat Window (Right) */}
      <ChatWindow/>
    </div>
  );
};

export default Message;
