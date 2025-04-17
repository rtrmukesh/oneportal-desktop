import React, { useState } from 'react';
import UserList from './UserList';
import { FiX } from 'react-icons/fi';

const Sidebar = () => {
  const [searchText, setSearchText] = useState('');

  const handleClearSearch = () => {
    setSearchText('');
  };

  return (
    <div className="slack-sidebar">
      {/* 🔍 Search Input */}
      <div style={{ position: 'relative', padding: '8px' }}>
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
          }}
        />
        {searchText && (
          <button
            onClick={handleClearSearch}
            style={{
              position: 'absolute',
              right: '1%',
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

      {/* 👥 User List */}
      <div style={{ padding: '8px' }}>
        <UserList search={searchText} />
      </div>
    </div>
  );
};

export default Sidebar;
