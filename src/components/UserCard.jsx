import React from 'react';

const AvatarCard = ({
  first_name = '',
  last_name = '',
  media_url = '',
  size = 40,
  showName = true,
}) => {
  const initials = `${first_name?.charAt(0)}${last_name?.charAt(0)}`.toUpperCase();
  const fullName = `${first_name} ${last_name}`;

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: '23%',
    backgroundColor: 'gray',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size / 2.2,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    overflow: 'hidden',
    flexShrink: 0,
  };

  const nameStyle = {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1.2,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: 0 }}>
      <div style={avatarStyle}>
        {media_url ? (
          <img
            src={media_url}
            alt="avatar"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          initials
        )}
      </div>
      {showName && <span style={nameStyle}>{fullName}</span>}
    </div>
  );
};

export default AvatarCard;
