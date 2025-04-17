import React, { useState, useEffect, useRef } from 'react';
import { FiSettings } from 'react-icons/fi';
import EStore from '../../../lib/EStore';
import { useNavigate } from 'react-router-dom';
import { version } from '../../../../package.json';

const SidebarFooter = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 10,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
      }}
    >
      <div className="dropdown" ref={menuRef} style={{ position: 'relative' }}>
        <button
          className="btn btn-link dropdown-toggle"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            fontSize: '22px',
            color: '#fff',
            textDecoration: 'none',
          }}
          data-bs-toggle="dropdown"
          aria-expanded={isMenuOpen}
        >
          <FiSettings size={30} />
        </button>
        {isMenuOpen && (
          <div
            className="dropdown-menu show"
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
              zIndex: 100,
              padding:0,
              margin:0
            }}
          >
            <button
              className="dropdown-item"
              onClick={async () => {
                setIsMenuOpen(false);
                await EStore.clear();
                navigate('/');
              }}
              style={{
                padding:20
              }}
            >
              Logout
            </button>
            <div className="dropdown-divider"></div>
            <span className="dropdown-item-text text-muted">Version {version}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarFooter;
