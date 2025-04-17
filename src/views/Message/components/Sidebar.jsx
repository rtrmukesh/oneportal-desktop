import React, { useState } from 'react';
import UserList from './UserList';
import { FiX } from 'react-icons/fi';
import SidebarFooter from './SidebarFooter';

const Sidebar = () => {
  const [searchText, setSearchText] = useState('');

  const handleClearSearch = () => {
    setSearchText('');
  };

  return (
    <div
      className="slack-sidebar"
      style={{
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)', 
          padding: '8px',
        }}
      >
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search ..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 36px 10px 12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '14px',
              backgroundColor:"#e2dede"
            }}
          />
          {searchText && (
            <button
              onClick={handleClearSearch}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#999',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#000')}
              onMouseLeave={(e) => (e.target.style.color = '#999')}
            >
              <FiX size={18} />
            </button>
          )}
        </div>
      </div>

      {/* 👥 User List */}
      <div className='sideBarList' style={{flex: 1,  padding: '8px'  }}>
        <UserList search={searchText} />
      </div>
    <SidebarFooter/>
    </div>
  );
};

export default Sidebar;
