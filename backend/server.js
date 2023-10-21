const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// enable the connection
io.on("connection", (socket) => {
  console.log("what is socket", socket);
  console.log("Socket is active");
  // listing to events
  socket.on("chat", (payload) => {
    console.log("payload", payload);
    // reive and through back all the info. # as chat app works
    io.emit("chat", payload);
  });
});

server.listen(5000, () => console.log("server is listening on port 5000"));
