import React, { useEffect, useState } from 'react';
import { FaCheck, FaCheckDouble, FaChevronDown, FaDownload, FaInfoCircle, FaShare, FaTrash } from 'react-icons/fa';
import MediaViewer from '../../../components/MediaViewer';
import AvatarCard from '../../../components/UserCard';
import { useAppContext } from '../../../context/AppContext';
import Color from '../../../lib/Color';
import DateTime from '../../../lib/DateTime';
import DynoName from './DynoName';

export const isKeyAvailable = (obj, key) => {
    let isKey = Object.keys(obj).includes(key);
    return isKey
}

const ChatList = (props) => {

    const { selectedUser, selectedChannel, dirMessages, channalMessageList } = useAppContext();
    let { } = props;
    const [showMenu, setShowMenu] = useState(null);

    const scrollToBottom = () => {
        const chatElement = document.getElementById("mainChat");
        if (chatElement) {
            chatElement.scrollTo({
                top: chatElement.scrollHeight,
                behavior: "smooth",
            });
        }
    };


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


    let messages = selectedUser ? dirMessages.slice().reverse() : selectedChannel ? channalMessageList : []

    useEffect(() => {
        setTimeout(() => {
            scrollToBottom();
        }, 100);
    }, [messages]);



    const renderChatMessage = (msg, index) => {
        return (
            <div
                key={index}
                className={`message ${msg.isSender ? "own-message" : "other-message"}`}
            >
                <div className="relative">

                    <FaChevronDown className="ml-2 message-options" onClick={() => setShowMenu(index)} />

                    {(showMenu && showMenu == index) && (
                        <div className="menu-dropdown dropup">
                            <div className="arrow-up dropup" />
                            <ul className="dropdown-list ">
                                <li><FaInfoCircle /> info</li>
                                {msg.media_url && <li><FaDownload /> Download</li>}
                                <li><FaShare /> Forward</li>
                                <li className="text-danger"><FaTrash /> Delete</li>
                            </ul>
                        </div>
                    )}
                </div>
                <DynoName msg={msg} />

                {msg.media_url && <MediaViewer media_url={msg.media_url} />}

                {msg.message && (
                    <div className="message-content" dangerouslySetInnerHTML={{ __html: msg.message }} />
                )}

                <div className="message-footer">
                    <span className="timestamp">{DateTime.formatTimestamp(msg?.timestamp)}</span>

                    {!selectedChannel && msg.isSender && (
                        msg.read_at ? (
                            <FaCheckDouble color="#34b7f1" />
                        ) : (
                            <FaCheck />
                        )
                    )}
                </div>
            </div>
        );
    }

    return (
        <div id="mainChat" className="messages">
            {messages.slice().reverse().map((msg, index) => (
                <div
                    key={index}
                    className={`sample d-flex  ${msg.isSender ? "own-message" : "other-message"}`}
                >
                    {/* Show avatar only for received messages */}
                    {selectedChannel && (isKeyAvailable(msg, "isSender") && !msg.isSender) && (
                        <div className="me-2">
                            <AvatarCard first_name={msg?.first_name} last_name={msg?.last_name} showName={false} color={Color.getColorByUser(`${msg?.first_name ? msg?.first_name : ""}${msg?.last_name ? msg?.last_name : ""}`)}
                            isTransprent={index == 0 ? false : msg?.user_id == messages?.slice()?.reverse()[index - 1]?.user_id}
                            />
                        </div>
                    )}
                    <div className='w-100'>
                        {renderChatMessage(msg, index)}
                    </div>
                </div>
            ))}
        </div>

    )
}

export default ChatList
