const socketIO = require('socket.io');

module.exports = function(server) {
    // Initialize Socket.IO
    const io = socketIO(server);

    // Define an event handler for when a client connects
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Event handler for private messaging
        socket.on('private message', (data) => {
            console.log(`Private message received from ${data.sender} to ${data.receiver}: ${data.message}`);
            // Emit the private message to the intended receiver if data is complete
            if (data.sender && data.receiver && data.message) {
                console.log(`Sending private message from ${data.sender} to ${data.receiver}: ${data.message}`);
                // Emit the private message to the intended receiver only
                io.to(data.receiver).emit('private message', data);
                console.log(`Private message sent from ${data.sender} to ${data.receiver}: ${data.message}`);
            } else {
                console.error("Private message data incomplete:", data);
            }
        });

        // Event handler for when a client disconnects
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return io;
};
