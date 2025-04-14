import React, { useEffect, useState } from "react";
import MessagesService from "../../../services/MessagesService";
import ArrayList from "../../../lib/ArrayList";
import AvatarCard from "../../../components/UserCard";

const UserList = () => {
  const users = ["John", "Jane", "Paul"];
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
            <li className="row" key={user?.id} onClick={()=> {console.log('>>>------------------------> ', );}}>
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
