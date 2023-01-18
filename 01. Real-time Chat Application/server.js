// What's Happening Here
const express = require("express");
const app = express(); // instance of Express App
const server = app.listen(3000, () => {
  // server object created
  console.log("Server is listening on port 3000");
  // will run when server is ready to handle incoming requests
});

const io = require("socket.io")(server); // socket.io instance is created and attached to server

io.on("connection", (socket) => {
  // listens for a 'connection' event, which is emitted when a client connects to the server
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    // listens for a 'chat message' event, which is emitted by a client when they want to send a message.
    console.log("message: " + msg);
    io.emit("chat message", msg); //  emits the same message to all connected clients
  });
});
