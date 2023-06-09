import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./App.css";

function Chats({ socket, userName, roomName }) {
  const [currentMsg, setCurrentMsg] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMsg !== "") {
      const MessageData = {
        roomName: roomName,
        author: userName,
        message: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getHours(),
      };
      await socket.emit("send_message", MessageData);
      setMessageList((list) => [...list, MessageData]);
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live chat</p>
      </div>

      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => {
            return (
              <div
                key={index}
                className="message"
                id={userName === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p id="message">{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMsg}
          placeholder="type..."
          onChange={(event) => {
            setCurrentMsg(event.target.value);
          }}
          // onKeyPress={(event) => {
          //   event.key === "Enter" && sendMessage();
          // }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chats;
