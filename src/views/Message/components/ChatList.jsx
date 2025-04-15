import React, { useEffect, useState } from 'react';
import { FaCheck, FaCheckDouble, FaChevronDown, FaDownload, FaInfoCircle, FaShare, FaTrash } from 'react-icons/fa';
import MediaViewer from '../../../components/MediaViewer';
import DateTime from '../../../lib/DateTime';

const ChatList = (props) => {

    let {
        dirMessages,

    } = props;


    const [showMenu, setShowMenu] = useState(null);
    const [openMedia, setOpenMedia] = useState(null)


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


    return (
        <div className="messages">
            {dirMessages.map((msg, index) => {

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
                        {msg.media_url && <MediaViewer media_url={msg.media_url} />}

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
    )
}

export default ChatList
