import "./App.css";
import { useState } from "react";
import io from "socket.io-client";
import Chats from "./Chats";

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && roomName !== "") {
      socket.emit("join_room", roomName);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join Room</h3>
          <input
            type="text"
            placeholder="name..."
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="room id..."
            onChange={(event) => {
              setRoomName(event.target.value);
            }}
          />
          <br />
          <br />
          <button onClick={joinRoom}>click</button>
        </div>
      ) : (
        <Chats socket={socket} userName={userName} roomName={roomName} />
      )}
    </div>
  );
}

export default App;
