const Chat = require("./model");
// Join the users to the db
const userJoin = async (username, room) => {
  let user;
  // check if the user exists or not
  const userExists = await Chat.findOne({ "usernames": username });
  // check if the room exists or not
  const roomExists = await Chat.findOne({ room: room });
  if (!roomExists) {
    try {
      const r = await Chat.create({ room });
      room = r;
      if (userExists) {
        user = username;
      }
      console.log("room created!");
    } catch (error) {
      console.log(error);
    }
  }

  if (!userExists) {
    await Chat.findOneAndUpdate(
      { room },
      { $push: { usernames: username } },
      { runValidators: true }
    );
    user = username;
    if (roomExists) {
      room = roomExists;
    }
    console.log("User is created");
  }

  return { username: user, room };
};

// When the user leaves the chat remove him from db
const removeUser = async (username) => {
  const user = await Chat.findOne({ "usernames": username });
  return user;
};

module.exports = {
  userJoin,
  removeUser,
};
