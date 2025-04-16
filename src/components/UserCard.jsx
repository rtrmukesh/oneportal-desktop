import React from 'react';

const AvatarCard = ({
  first_name = '',
  last_name = '',
  media_url = '',
  size = 40,
  showName = true,
  color,
  isTransprent = false,
  badgeCount = 0,
  showCount
}) => {
  const initials = `${first_name ? first_name?.charAt(0) : ""}${last_name ? last_name?.charAt(0) : ""}`.toUpperCase();
  const fullName = `${first_name} ${last_name}`;

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: '23%',
    backgroundColor: isTransprent ? "transprent" : color ? color : 'gray',
    color: isTransprent ? "#f0f0f0" : '#fff',
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

  const badgeStyle = {
    width: 18,
    height: 18,
    borderRadius: '50%',
    backgroundColor: '#ff4d4d', // Red background color for the badge
    color: '#fff',
    fontSize: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    padding: '2px',
  };

  return (
    <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', paddingLeft: 0,margin:0,padding:0  }}>
      <div className='d-flex ' style={{ gap: '0.75rem', overflow: 'hidden',margin:0,padding:0  }}>
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
      {(badgeCount > 0 && showCount) && (
        <div style={{ justifyContent: "end", display: "flex",margin:0,padding:0 }}>
          <div style={badgeStyle}>
            {badgeCount}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarCard;
