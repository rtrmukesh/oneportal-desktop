import React, { useState } from 'react';
import ChannelList from './ChannelList';
import UserList from './UserList';

const Sidebar = ({ setSelectedChannel }) => {
  const [isChannelOpen, setIsChannelOpen] = useState(true);
  const [isUserOpen, setIsUserOpen] = useState(true);

  return (
    <div className="slack-sidebar">
      <div className="sidebar-section">
        <div
          className="sidebar-header"
          onClick={() => setIsChannelOpen(!isChannelOpen)}
        >
          <span className="toggle-icon">{isChannelOpen ? '▾' : '▸'}</span>
          <span className="section-title">Channels</span>
        </div>
        {isChannelOpen && (
          <div className="section-content">
            <ChannelList setSelectedChannel={setSelectedChannel} />
          </div>
        )}
      </div>

      <div className="sidebar-section">
        <div
          className="sidebar-header"
          onClick={() => setIsUserOpen(!isUserOpen)}
        >
          <span className="toggle-icon">{isUserOpen ? '▾' : '▸'}</span>
          <span className="section-title">Direct Messages</span>
        </div>
        {isUserOpen && (
          <div className="section-content">
            <UserList />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
