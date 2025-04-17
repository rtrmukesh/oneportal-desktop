import React, { useState, useEffect, useRef } from 'react';
import { FiSettings } from 'react-icons/fi';
import EStore from '../../../lib/EStore';
import { useNavigate } from 'react-router-dom';

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
        padding: 5
      }}
    >
      <div style={{ position: 'relative' }} ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '22px',
            color: '#555',
            padding: 0,
            margin: 0,
          }}
        >
          <FiSettings color="white" size={30} />
        </button>

        {isMenuOpen && (
          <div style={{
            position: 'absolute',
            bottom: '40px', // Positioning dropdown above the button
            left: '50%',
            transform: 'translateX(-50%)',
            width: '180px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 100,
            paddingBottom: '10px', // space for the arrow
          }}>
            {/* Downward Arrow at bottom */}
            <div style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '10px solid white',
            }} />

            <button
              style={{
                width: '100%',
                padding: '10px',
                textAlign: 'left',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
              }}
               className="dropdown-button"
              onClick={async () => {
                setIsMenuOpen(false);
                await EStore.clear()
                navigate("/")
              }}
            >
              Logout
            </button>
          </div>
        )}


      </div>
    </div>
  );
};

export default SidebarFooter;
