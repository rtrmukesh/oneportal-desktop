import React, { useEffect } from 'react';
import MessageChannelService from '../../../services/MessageChannelService';
import ArrayList from '../../../lib/ArrayList';
import { useAppContext } from '../../../context/AppContext';
import MessagesService from '../../../services/MessagesService';
import EStore from '../../../lib/EStore';
import { C_ID, S_ID } from '../../../Helper/EStore';

const ChannelList = ({ }) => {
  const { setSelectedChannel, setSelectedUser, setDirMessages, getChannalMessage, channelList, getChannelList  } = useAppContext();

  useEffect(() => {
    getChannelList && getChannelList();
  }, []);


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

  const handleReadAt = async (channel)=>{
    const data = new FormData();
    data.append("channelId", channel?.channel_id);
    await MessagesService.groupMessageReadAt(data,(res)=>{
      if(res){
        getChannelList()
      }
    })
  }

  return (
    <div className="side-list">
      <ul>
        {ArrayList.isArray(channelList) && channelList.map((channel) => (
          <li className='d-flex' style={{paddingLeft: 0,justifyContent:"space-between"}} key={channel?.channel_id} onClick={async () => {
            await EStore.removeItem(S_ID)
            await EStore.setItem(C_ID, channel?.channel_id)
            handleReadAt && handleReadAt(channel)
            setDirMessages && setDirMessages([])
            setSelectedUser && setSelectedUser(null)
            setSelectedChannel && setSelectedChannel(channel)
            getChannalMessage && getChannalMessage(channel)
          }}>
            <span>{channel?.channel_name}</span>
               {channel?.unreadCount > 0 && <div style={badgeStyle}>
                  {channel?.unreadCount}
                </div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;
