import { useEffect } from 'react';
import { connectSocket, getSocketInstance, disconnectSocket } from '../services/ScoketService'; // Update the path as needed
import appIcon from "../../build/icon.png";
import EStore from '../lib/EStore';
import { USER_ID } from '../Helper/EStore';

const useNotificationSocket = (getChannelList, getMessageList) => {
    useEffect(() => {
        const fetchUserIdAndConnectSocket = async () => {
            const userId = await EStore.getItem(USER_ID); // Fetch the userId from storage
            if (!userId) {
                fetchUserIdAndConnectSocket()
            }
            const socket = connectSocket(userId); // Establish socket connection

            if (socket) {
                // Register the user after fetching userId
                socket.emit("register", { userId });

                socket.on("receiveMessage", (data) => {
                    let channelNotify = data?.senderName ? `[Thidiff] from ${data?.senderName}` : null;
                    let userNotify = data?.channel_name ? `[Thidiff] in ${data?.channel_name}` : null;
                    new Notification(userNotify ? userNotify : channelNotify, {
                        body: data?.message,
                        icon: appIcon
                    })
                    getChannelList && getChannelList();
                    getMessageList && getMessageList()
                });
            }
        };

        fetchUserIdAndConnectSocket(); // Call the async function

        return () => {
            const activeSocket = getSocketInstance();
            if (activeSocket) {
                activeSocket.off("receiveMessage");
                disconnectSocket();
            }
        };
    }, []); // Empty dependency array to run the effect only once
};

export default useNotificationSocket;
