import React, { useEffect } from 'react';
import MessageChannelService from '../../../services/MessageChannelService';
import ArrayList from '../../../lib/ArrayList';
import { useAppContext } from '../../../context/AppContext';

const ChannelList = ({ }) => {
  const { setSelectedChannel, setSelectedUser, setDirMessages, getChannalMessage } = useAppContext();

  const [channelList, setChannelList] = React.useState([]);
  useEffect(() => {
    getChannelList();
  }, []);

  const getChannelList = async () => {
    try {
      const response = await MessageChannelService.search();
      const data = response?.data?.data;
      setChannelList(data);
    } catch (err) {
      console.error("Channel list error:", err);
    }
  };

  return (
    <div className="side-list">
      <ul>
        {ArrayList.isArray(channelList) && channelList.map((channel) => (
          <li className='row' key={channel} onClick={() => {
            setDirMessages && setDirMessages([])
            setSelectedUser && setSelectedUser(null)
            setSelectedChannel && setSelectedChannel(channel)
            getChannalMessage && getChannalMessage(channel)
          }}>
            {channel?.channel_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;
