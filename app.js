const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const http = require("http");
const mongoose = require("mongoose");

const { DATABASE_URL } = process.env;

// Local functions for managing user and message
const { userJoin, removeUser } = require("./utils/users");
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
  let nickname;
  let roomname;
  // Welcome the user
  socket.on("join", async ({ username, room }) => {
    if (username === "admin") {
      await userJoin(username, room || "admin");
      nickname = username;
      await socket.join(room || "admin");
      roomname = room;
    } else {
      const user = userJoin(username, "room1");
      // Add user to room
      socket.join(user.room);
      nickname = username;
      roomname = room;
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
    io.to(roomname).emit("message", formatMessage(nickname, msg));
  });

  // If This user disconnects then let everyone know that
  socket.on("disconnect", () => {
    const user = removeUser(nickname);
    if (user) {
      io.to(roomname).emit(
        "message",
        formatMessage(botName, `${nickname} has left the chat`)
      );
    }
  });
});

const PORT = process.env.PORT || 3000;

// Connect to the DataBase
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log("You are connected with your DB");
}, (error) => {
  console.log(error);
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
