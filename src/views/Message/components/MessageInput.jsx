import React, { useRef, useState, useEffect } from "react";
import MessagesService from "../../../services/MessagesService";
import { useAppContext } from "../../../context/AppContext";
import ArrayList from "../../../lib/ArrayList";
import ChannelMessagesService from "../../../services/ChannelMessagesService";

const MessageInput = () => {
  const { selectedUser, getDirectMessage, selectedChannel, getChannalMessage } = useAppContext();

  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [rows, setRows] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false)



  const handleSend = async () => {
    if (!message.trim() && selectedFiles.length === 0) return;
    setIsLoading(true)
    let msgData = new FormData();
    msgData.append("message", message.trim());

    if(selectedUser){
      msgData.append("reciever_user_id", selectedUser?.id);
    }

    if(selectedChannel){
      msgData.append("channel_id", selectedChannel?.channel_id)
    }


    if (ArrayList.isArray(selectedFiles)) {
      selectedFiles.forEach((file, index) => {
        msgData.append(`media_file`, file);
      });
    }

    let response=null

    if(selectedChannel){
       response = await ChannelMessagesService.Create(msgData);
    }

    if(selectedUser){
       response = await MessagesService.Create(msgData);
    }

    if (response) {
      setMessage("");
      setRows(1);
      setSelectedFiles([]);
      if(selectedUser){
        getDirectMessage && getDirectMessage();
      }
      if(selectedChannel){
        getChannalMessage && getChannalMessage()
      }
      setIsLoading(false)
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
    e.target.value = ""; // reset so same file can be re-selected
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const lineCount = message.split("\n").length;
    const newRows = Math.min(25, Math.max(1, lineCount));
    setRows(newRows);
  }, [message]);

  return (
    <div style={{ padding: "16px", boxSizing: "border-box" }}>
      <div
        style={{
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          background: "#ffffff",
          padding: "12px",
          border: "1px solid #e0e0e0",
        }}
      >
        {/* Textarea */}
        <textarea
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={rows}
          style={{
            width: "100%",
            resize: "none",
            padding: "10px",
            fontSize: "15px",
            borderRadius: "6px",
            border: "none",
            outline: "none",
            minHeight: "40px",
            overflowY: rows === 25 ? "auto" : "hidden",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        {/* Preview Section */}
        {selectedFiles.length > 0 && (
          <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {selectedFiles.map((file, index) => {
              const isImage = file.type.startsWith("image/");
              const isVideo = file.type.startsWith("video/");
              const previewUrl = URL.createObjectURL(file);

              return (
                <div key={index} style={{ position: "relative" }}>
                  {isImage && (
                    <img
                      src={previewUrl}
                      alt={`preview-${index}`}
                      style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "6px" }}
                    />
                  )}
                  {isVideo && (
                    <video
                      src={previewUrl}
                      controls
                      style={{ width: "100px", height: "100px", borderRadius: "6px" }}
                    />
                  )}
                  <span
                    onClick={() => removeFile(index)}
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-6px",
                      background: "#f00",
                      color: "#fff",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      textAlign: "center",
                      lineHeight: "20px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    ×
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <span
              style={{  cursor: ArrayList.isArray(selectedFiles) ? "not-allowed" : "pointer", fontSize: "18px" }}
              onClick={() =>{
                if (ArrayList.isArray(selectedFiles)) return;
                fileInputRef.current.click()
              }}
              title="Attach files"
            >
              📎
            </span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              multiple
              accept="image/*,video/*"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim() && selectedFiles.length === 0 || isLoading}
            style={{
              fontSize: "18px",
              padding: "6px 12px",
              backgroundColor: message.trim() || selectedFiles.length > 0 || isLoading ? "#0b81ff" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: message.trim() || selectedFiles.length > 0 || isLoading ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "40px",
              height: "36px",
            }}
          >
            {isLoading ? (
              <span className="spinner" />
            ) : (
              "➤"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
