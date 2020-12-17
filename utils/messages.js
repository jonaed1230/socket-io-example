const Chat = require("./model");

const formatMessage = (username, text) => {
  return {
    username,
    text,
    createdAt: new Date().getTime()
  }
}
const saveMessage = async (room, username, msg) => {
  console.log(room);
  await Chat.findOneAndUpdate({ room }, {
    $push: {
      chat: {
        username,
        chat: msg,
        createdAt: new Date().getTime(),
      }
    }
  });
}

const getMessages = async(room) => {
  const userRoom = await Chat.findOne({ room: room });
  if (userRoom) {
    return userRoom.chat;
  } else {
    return [];
  }
  
}

module.exports = { formatMessage, saveMessage, getMessages };