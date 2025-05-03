const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
    strictNullHandling: true,
    allowDots: true,
});

const chatForm = document.querySelector('#chat-form');

const socket = io();

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error);
        location.href = '/';
    }
});

socket.on('message', function(data) {
    const message = data;

    // show message in the DOM
    outputMessage(message);

    // scroll down to the last message
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const message = e.target.elements.msg.value;

    // emit message to server
    socket.emit('chatMessage', message);
    
    // clear input
    e.target.elements.msg.value = '';
})

const outputMessage = function(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
        <p class="meta">${message.username} <span>${message.time}</span></p>
        <p class="text">
            ${message.message ?? ''}
        </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

