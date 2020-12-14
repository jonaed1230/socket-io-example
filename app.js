const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const http = require("http");

// Local functions for managing user and message
const { userJoin, currentUser, removeUser } = require("./utils/users");
const formatMessage = require("./utils/messages");

// init the express app and socket
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Handle any public pages or html pages
app.use(express.static(path.join(__dirname, "public")));

const botName = "Testing Bot";

// Init the socket

io.on("connection", (socket) => {
  // Welcome the user
  socket.on("join", ({ username }) => {
    if (username === "admin") {
      const user = userJoin(socket.id, username, "admin");
      socket.join(user.room);
    } else {
      const user = userJoin(socket.id, username, "room1");
      // Add user to room
      socket.join(user.room);
      socket.emit("message", formatMessage(botName, `Welcome to room1 ${username}`));
      // Broadcast to other users that he is joined
      socket.broadcast
        .to("room1")
        .emit(
          "message",
          formatMessage(botName, `${username} has joined the Chat`)
        );
      socket.broadcast.to('admin').emit("message", formatMessage(botName, `${username} has joined the chat please text with him`));
    }
  });

  // Listen for any messages from users
  socket.on("chatMessage", (msg) => {
    const user = currentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // If This user disconnects then let everyone know that
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
