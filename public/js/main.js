const chatForm = document.querySelector('#chat-form');

const socket = io();

socket.on('message', function(data) {
    console.log(data);
});

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const message = e.target.elements.msg.value;
    socket.emit('chatMessage', message);
})