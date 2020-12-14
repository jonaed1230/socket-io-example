const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const http = require('http');

// Local functions for managing user and message
const { userJoin, currentUser, removeUser } = require('./utils/users');
const formatMessage = require('./utils/messages');

// init the express app and socket
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Handle any public pages or html pages
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Testing Bot';

// Init the socket

io.on('connection', socket => {
    let username;
    // Welcome the user
    socket.on('join', ({ username, room }) => {
        username = username;
        // Add user to room
        socket.join('room1');
        socket.emit('message', `Welcome to room1 ${username}`);
        // Broadcast to other users that he is joined
        socket.broadcast.to('room1').emit('message', `${username} has joined the Chat`);
    });
    
    // Listen for any messages from users
    socket.on('chatMessage', msg => {
        const user
    })
    
    
    // If This user disconnects then let everyone know that
})


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
