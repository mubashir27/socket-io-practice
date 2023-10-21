import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import { nanoid } from "nanoid";
function App() {
  const socket = io.connect("http://localhost:5000");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const username = nanoid(4);
  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <>
      {chat.map((payload, index) => (
        <p key={index}>
          {payload.message} <h6>{payload.username}</h6>{" "}
        </p>
      ))}
      <form>
        <input
          type="text"
          name="chat"
          placeholder="send text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <div
          onClick={() => {
            socket.emit("chat", { message, username });
            setMessage("");
          }}>
          {" "}
          send
        </div>
      </form>
    </>
  );
}

export default App;
