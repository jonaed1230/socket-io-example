const users = [];

// Join the users to the db
const userJoin = (id, username, room ) => {
  const user = { id, username, room };
  users.push(user);
  return user;
};

// Get current user
const currentUser = (id) => {
  return users.find(user => user.id === id);
}

// When the user leaves the chat remove him from db
const removeUser = (id) => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return user.splice(index, 1)[0];
  }
}

module.exports = {
  userJoin,
  currentUser,
  removeUser
};