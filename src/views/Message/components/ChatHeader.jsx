import React from "react";
import RefreshButton from "../../../components/RefreshButton";
import AvatarCard from "../../../components/UserCard";
import { useAppContext } from "../../../context/AppContext";

const ChatHeader = ({ channelName, userName,  }) => {
  const { onRefresh, isLoading } = useAppContext();


  return (
    <div
      className="chat-header d-flex justify-content-between align-items-center p-2"
      style={{ borderBottom: "1px solid #e0e0e0" }}
    >
      <div className="chat-header-left d-flex align-items-center gap-2">
        {userName && (
          <AvatarCard
            first_name={userName?.first_name}
            last_name={userName?.last_name}
            media_url={userName?.media}
            data={userName ? userName : channelName}
          />
        )}
        {channelName && <h5 className="mb-0">{channelName}</h5>}
      </div>
        <RefreshButton
        isLoading={isLoading}
        onRefresh={()=>onRefresh()}
        />
      </div>
  );
};

export default ChatHeader;
