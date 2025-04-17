import React, { useEffect } from "react";
import AvatarCard from "../../../components/UserCard";
import { useAppContext } from "../../../context/AppContext";
import { C_ID, S_ID } from "../../../Helper/EStore";
import ArrayList from "../../../lib/ArrayList";
import EStore from "../../../lib/EStore";
import MessagesService from "../../../services/MessagesService";
import NoRecordsFound from "../../../components/NoRecordsFound";
import { useState } from "react";

const UserList = (props) => {
  let { search } = props;
  const { setSelectedUser, setSelectedChannel, getDirectMessage, setChannalMessageList, getMessageList, messageUserList, channelList, setDirMessages, getChannalMessage, getChannelList } = useAppContext();
  const [isHighLight, setIsHighLight] = useState(null)

  useEffect(() => {
    getMessageList && getMessageList();
    getChannelList && getChannelList()
  }, []);


  const formatMessageChannelList = (messageList = [], channels = []) => {
    return [
      ...(Array.isArray(channels) ? channels.map((data) => ({
        channel_id: data?.channel_id,
        type: "channel",
        first_name: data?.channel_name,
        last_name: data?.last_name,
        media: null,
        recent_message: data?.mostRecentMessage,
        recent_message_timestamp: data?.timeStamp,
        isUnRead: false,
        showLocationShiftPermission: false,
        current_shift_name: null,
        current_location_name: null,
        channel_name: data?.channel_name,
        read_at: data?.unreadCount,
        user_role: data?.user_role,
        user_filter_type: data?.user_filter_type,
        status: data?.status,
        location: data?.location,
        media_url: data?.media_url,
        allowToSend: data?.allowToSend,
        isAllowToSend: data?.isAllowToSend


      })) : []),
      ...(Array.isArray(messageList) ? messageList.map((data) => ({
        id: data?.id,
        type: "message",
        first_name: data?.first_name,
        last_name: data?.last_name,
        media: data?.media,
        recent_message: data?.recent_last_message,
        recent_message_timestamp: data?.recent_message_timestamp,
        isUnRead: data?.isUnRead,
        showLocationShiftPermission: data?.showLocationShiftPermission,
        current_shift_name: data?.current_shift_name,
        current_location_name: data?.current_location_name,
        media_url: data?.media_url,
        read_at: data?.read_at,
      })) : []),
    ].sort((a, b) =>
      new Date(b.recent_message_timestamp || 0) - new Date(a.recent_message_timestamp || 0)
    );
  };



  let mergedList = formatMessageChannelList(messageUserList, channelList).filter(item =>
    item?.first_name?.toLowerCase().includes(search.toLowerCase())
  );


  const handleReadAt = async (userId) => {
    let data = new FormData();
    data.append("user_id", userId)
    await MessagesService.update(data, (res) => {
      if (res) {
        getMessageList()
      }
    })
  }

  const handleChannelReadAt = async (channel) => {
    const data = new FormData();
    data.append("channelId", channel?.channel_id);
    await MessagesService.groupMessageReadAt(data, (res) => {
      if (res) {
        getChannelList()
      }
    })
  }

  const returnHighLightColor = (user) => {
    const isHighlighted =
      isHighLight &&
      ((user?.type === "message" &&
        isHighLight?.isMessage &&
        user?.id === isHighLight?.id) ||
        (user?.type === "channel" &&
          !isHighLight?.isMessage &&
          user?.channel_id === isHighLight?.id));

    return {
      backgroundColor: isHighlighted ? "white" : "",
      color: isHighlighted ? "black" : "",
    }
  }

  return (
    <div className="sideBarList" style={{ flex: 1, padding: "8px" }}>
      <div className="side-list">
        <ul>
          {ArrayList.isArray(mergedList) ?
            (mergedList.map((user, index) => (
              <li
                className="row"
                key={index}
                style={returnHighLightColor(user)}
                onClick={async () => {
                  if (user?.type == "message") {
                    setIsHighLight({
                      isMessage: true,
                      id: user?.id
                    })
                    await EStore.removeItem(C_ID)
                    await EStore.setItem(S_ID, user?.id)
                    if (user?.read_at && user?.read_at > 0) {
                      handleReadAt && handleReadAt(user?.id)
                    }
                    setSelectedChannel && setSelectedChannel(null)
                    setChannalMessageList && setChannalMessageList([])
                    setSelectedUser && setSelectedUser(user);
                    getDirectMessage && getDirectMessage(user?.id)
                  } else {
                    setIsHighLight({
                      isMessage: false,
                      id: user?.channel_id
                    })
                    await EStore.removeItem(S_ID)
                    await EStore.setItem(C_ID, user?.channel_id)
                    if (user?.read_at && user?.read_at > 0) {
                      handleChannelReadAt && handleChannelReadAt(user)
                    }
                    setDirMessages && setDirMessages([])
                    setSelectedUser && setSelectedUser(null)
                    setSelectedChannel && setSelectedChannel(user)
                    getChannalMessage && getChannalMessage(user)
                  }
                }}
              >
                <AvatarCard
                  first_name={user?.first_name}
                  last_name={user?.last_name}
                  media_url={user?.media}
                  size={25}
                  showCount
                  badgeCount={user?.read_at}
                  data={user}
                />
              </li>
            ))) : (<NoRecordsFound message="No User Found" />)}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
