import React from 'react';

const ChannelList = ({ setSelectedChannel }) => {
  const channels = ['#general', '#random', '#help'];

  return (
    <div className="side-list">
      <ul>
        {channels.map((channel) => (
          <li className='row' key={channel} onClick={() => setSelectedChannel(channel)}>
            {channel}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;
