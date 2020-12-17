const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  usernames: {
      type: [String],
  },
  room: {
    type: String,
  },
  chat: [
    {
      username: String,
      chat: String,
      createdAt: Date,
    },
  ],
});

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;