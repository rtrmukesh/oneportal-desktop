import { useEffect } from 'react';
import { connectSocket, getSocketInstance, disconnectSocket } from '../services/ScoketService'; // Update the path as needed
import appIcon from "../../build/icon.png";
import EStore from '../lib/EStore';
import { C_ID, S_ID, USER_ID } from '../Helper/EStore';

const useNotificationSocket = (props) => {

    let { getChannelList, getMessageList, getDirectMessage, getChannalMessage } = props
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

                socket.on("receiveMessage", async (data) => {
                    let userNotify = data?.senderName ? `[Thidiff] from ${data?.senderName}` : null;
                    let channelNotify = data?.channel_name ? `[Thidiff] in ${data?.channel_name}` : null;

                    if (userNotify) {
                        const UID = await EStore.getItem(S_ID); // Fetch the userId from storage
                        getDirectMessage && getDirectMessage()
                        if (data?.senderId != UID) {
                            new Notification(userNotify, {
                                body: data?.message,
                                icon: appIcon
                            })
                        }
                    }

                    if (channelNotify) {
                        const CID = await EStore.getItem(C_ID); // Fetch the userId from storage
                        getChannalMessage && getChannalMessage()
                        if (data?.channel != CID) {
                            new Notification(channelNotify, {
                                body: data?.message,
                                icon: appIcon
                            })
                        }
                    }

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
