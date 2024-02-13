// sender.js
module.exports = function(io) {
    io.on('connection', (socket) => {
        // You can emit messages from here to the server
        console.log('Sender connected');

        // Example: Sending a private message
        socket.emit('private_message', {
            sender: 'sender@example.com',
            receiver: 'receiver@example.com',
            message: 'Hello, receiver!'
        });
    });
};
