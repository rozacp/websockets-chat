var express = require('express');
var server = express();

// server
var port = 9000;
server.use(express.static('public'));
var io = require('socket.io')(server.listen(port));

// socket
io.on('connection', function(socket) {

    socket.emit( 'chat', {
        handle: 'Chatbot',
        message: 'Welcome to websockets chat. Beep Bop!'
    });

    console.log('Connect:', socket.id);

    socket.on('disconnect', function() {
        console.log('Disconnect:', socket.id);
    });

    socket.on('chat', function(data) {

        io.emit('chat', data);
        console.log(socket.id, ': ' ,data);
    });

    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });

    // var user = Object.keys(io.engine.clients)[0];
    // socket.to(user).emit('chat', {handle: 'Sekret Agent', message: 'Super sekret msg'});
});

console.log('\nServer up on port ' + port +'\n');