import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import { nanoid } from "nanoid";
function App() {
  const socket = io.connect("http://localhost:5000");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  return (
    <>
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
            socket.emit("chat", { message });
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
