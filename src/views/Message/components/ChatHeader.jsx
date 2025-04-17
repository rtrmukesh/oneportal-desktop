import React from "react";
import AvatarCard from "../../../components/UserCard";

const ChatHeader = ({ channelName, userName }) => {
  return (
    <div className="chat-header">
      <div className="chat-header-left">
        {userName && <AvatarCard
        first_name={userName?.first_name}
        last_name={userName?.last_name}
        media_url={userName?.media}
        data={userName ? userName : channelName}
        />}
        {channelName && <h2>{channelName}</h2>}
      </div>
    </div>
  );
};

export default ChatHeader;
