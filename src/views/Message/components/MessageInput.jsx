import React, { useRef, useState, useEffect } from "react";
import MessagesService from "../../../services/MessagesService";
import { useAppContext } from "../../../context/AppContext";

const MessageInput = (props) => {
    const { selectedUser, getDirectMessage } = useAppContext();
  
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [rows, setRows] = useState(1); // Start with 1 row for default height

  const { handleFileChange } = props;



  const handleSend =async ()=>{
    if (message?.trim()) {
    let msgData = new FormData()

    msgData.append("message", message ? message : "");
    msgData.append("reciever_user_id", selectedUser?.id);

    let response = await MessagesService.Create(msgData);


    if(response){
      setMessage(""); 
      setRows(1); 
      if(selectedUser){
        getDirectMessage && getDirectMessage()
      }
    }
  }
  }




  // Adjust rows dynamically based on content length
  useEffect(() => {
    const lineCount = message.split('\n').length;
    const newRows = Math.min(25, Math.max(1, lineCount)); // Max 25 rows
    setRows(newRows);
  }, [message]);

  return (
    <div
      style={{
        padding: "16px", // spacing inside sidebar
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          background: "#ffffff",
          padding: "12px",
          border: "1px solid #e0e0e0",
        }}
      >
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
            boxSizing: "border-box",
            outline: "none",
            minHeight: "40px", // Default height for normal input
            overflowY: rows === 25 ? "auto" : "hidden", // Add scroll after 25 rows
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <span
              style={{ cursor: "pointer", fontSize: "18px" }}
              onClick={() => fileInputRef.current.click()}
              title="Attach file"
            >
              📎
            </span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
               accept="image/*, video/*"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            style={{
              fontSize: "18px",
              padding: "6px 12px",
              backgroundColor: message.trim() ? "#0b81ff" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: message.trim() ? "pointer" : "not-allowed",
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
