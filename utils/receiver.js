// receiver.js
module.exports = function(io) {
    io.on('connection', (socket) => {
        // You can listen for messages from the server here
        console.log('Receiver connected');

        // Example: Listening for private messages
        socket.on('private_message', (data) => {
            console.log('Received private message:', data);
        });
    });
};
