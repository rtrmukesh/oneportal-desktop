import React, { useEffect } from "react";
import AvatarCard from "../../../components/UserCard";
import { useAppContext } from "../../../context/AppContext";
import ArrayList from "../../../lib/ArrayList";
import MessagesService from "../../../services/MessagesService";
import EStore from "../../../lib/EStore";
import { C_ID, S_ID } from "../../../Helper/EStore";

const UserList = (props) => {
  const { setSelectedUser, setSelectedChannel, getDirectMessage, setChannalMessageList, getMessageList,messageUserList } = useAppContext();

  useEffect(() => {
    getMessageList && getMessageList();
  }, []);


const handleReadAt=async (userId)=>{
  let data  = new FormData();
  data.append("user_id", userId)
  await MessagesService.update(data,(res)=>{
    if(res){
      getMessageList()
    }
  })
}


  return (
    <div className="side-list">
      <ul>
        {ArrayList.isArray(messageUserList) &&
          messageUserList.map((user) => (
            <li
              className="row"
              key={user?.id}
              onClick={async () => {
                await EStore.removeItem(C_ID)
                await EStore.setItem(S_ID, user?.id)
                handleReadAt && handleReadAt(user?.id)
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
                showCount
                badgeCount={user?.read_at}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserList;
