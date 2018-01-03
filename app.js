const express = require('express');
const server = express();

// server
const port = 9000;
server.use(express.static('public'));
const io = require('socket.io')(server.listen(port, () => console.log(`Server up on port ${port}`)));

// socket
io.on('connection', socket => {

    console.log(`Connect: ${socket.id}`);
    
    socket.on('disconnect', () => console.log(`Disconnect: ${socket.id}`));

    socket.emit('chat', {
        handle: 'Chatbot',
        message: 'Welcome to websockets chat. Beep Bop!'
    });

    socket.on('chat', data => {

        io.emit('chat', data);
        console.log(`${socket.id} [ ${data.handle} ]: ${data.message}`);
    });

    socket.on('typing', data => socket.broadcast.emit('typing', data));

    // const user = Object.keys(io.engine.clients)[0];
    // socket.to(user).emit('chat', {handle: 'Sekret Agent', message: 'Super sekret msg'});
});
