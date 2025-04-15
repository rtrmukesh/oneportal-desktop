import React, { useEffect, useState } from "react";
import MessagesService from "../../../services/MessagesService";
import ArrayList from "../../../lib/ArrayList";
import AvatarCard from "../../../components/UserCard";
import { useAppContext } from "../../../context/AppContext";

const UserList = (props) => {
  const { setSelectedUser, setSelectedChannel, getDirectMessage, setChannalMessageList } = useAppContext();
  const [messageUserList, setMessageUserList] = useState([]);

  useEffect(() => {
    getMessageList();
  }, []);

  const getMessageList = async () => {
    try {
      const response = await MessagesService.search();
      const data = response?.data?.data;
      setMessageUserList(data);
    } catch (err) {
      console.error("Message list error:", err);
    }
  };

  return (
    <div className="side-list">
      <ul>
        {ArrayList.isArray(messageUserList) &&
          messageUserList.map((user) => (
            <li
              className="row"
              key={user?.id}
              onClick={() => {
                setSelectedChannel && setSelectedChannel(null)
                setChannalMessageList && setChannalMessageList([])
                setSelectedUser && setSelectedUser(user);
                getDirectMessage && getDirectMessage(user?.id)
              }}
            >
              <AvatarCard
                first_name={user?.first_name}
                last_name={user?.last_name}
                media_url={user?.media}
                size={25}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserList;
