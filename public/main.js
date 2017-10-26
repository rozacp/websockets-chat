const socket = io('http://localhost:9000/');

// dom stuff
const output = document.querySelector('#output');
const feedback = document.querySelector('#feedback');
const handle = document.querySelector('#handle');
const message = document.querySelector('#message');
const send = document.querySelector('#send');

// Emitter
send.addEventListener('click', function() {
    
    if (handle.value && message.value) {
    
        socket.emit('chat', {
            handle: handle.value,
            message: message.value
        });

        message.value = '';
    }
});

message.addEventListener('keypress', function() {

    if (handle.value) {
        socket.emit('typing', handle.value);
    }
});

// Listener
socket.on('chat', function(data) {

    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ':</strong> ' + data.message + '</p>';
});

socket.on('typing', function(data) {

    feedback.innerHTML = '<p><em>' + data + ': is typing...</em></p>';
});