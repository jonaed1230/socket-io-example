const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname + '/public'));
const expressServer = app.listen(9000);
const io = socketio(expressServer);


io.on('connection', (socket) => {
    console.log('Dobrodosli kiceni svatovi')
})
      
io.of('/').on('connection',(socket) => {
    const room = socket.room;
    socket.on('newMessageToServer',(data) => {
        socket.join('soba1')
        console.log(room)
        io.emit('messageToClients',data);
        console.log(data);
        socket.on('StaticToServer',(data) => {
            io.to('soba1').emit('staticToClient', (data))
        })
    })
   
})
