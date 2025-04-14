import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import DateTime from "../../../lib/DateTime";
import { FaCheck, FaCheckDouble, FaChevronDown, FaDownload, FaInfoCircle, FaShare, FaTrash } from "react-icons/fa";

const ChatWindow = () => {
  const { selectedUser, selectedChannel, dirMessages } = useAppContext();
  const [showMenu, setShowMenu] = useState(null)




  useEffect(() => {
    const handleClickOutside = (event) => {
        setShowMenu(false);
        // setShowInfo(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  if (!selectedChannel && !selectedUser) {
    return (
      <div className="chat-window">Select a channel to start chatting.</div>
    );
  }


  return (
    <div className="chat-window">
      <ChatHeader channelName={selectedChannel?.channel_name} userName={selectedUser} />

      <div className="messages">
        {dirMessages.map((msg, index) => {

          return (
            <div
              key={index}
              className={`message ${msg.isSender ? "own-message" : "other-message"}`}
            >
              <div className="relative">
           
                 <FaChevronDown  className="ml-2 message-options" onClick={() => setShowMenu(index)} />

                {(showMenu && showMenu == index) && (
                  <div  className="menu-dropdown dropup">
                    <div className="arrow-up dropup"  />
                    <ul className="dropdown-list ">
                      <li><FaInfoCircle /> info</li>
                      {msg.media_url && <li><FaDownload /> Download</li>}
                      <li><FaShare /> Forward</li>
                      <li className="text-danger"><FaTrash /> Delete</li>
                    </ul>
                  </div>
                )}
              </div>
              {msg.media_url && (
                <img src={msg.media_url} alt="media" className="message-image" />
              )}

              {msg.message && (
                <div className="message-content" dangerouslySetInnerHTML={{ __html: msg.message }} />
              )}

              <div className="message-footer">
                <span className="timestamp">{DateTime.formatTimestamp(msg?.timestamp)}</span>

                {msg.isSender && (
                    msg.read_at ? (
                      <FaCheckDouble color="#34b7f1" /> 
                    ) : (
                      <FaCheck /> 
                    )
                )}
              </div>
            </div>
          );
        })}
      </div>


      <MessageInput handleFileChange={handleFileChange} />
    </div>
  );
};

export default ChatWindow;
