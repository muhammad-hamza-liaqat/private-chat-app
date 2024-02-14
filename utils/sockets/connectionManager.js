const socketIo = require('socket.io');

const users = {};

function initialize(server) {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('A user connected with socketID', socket.id);

        socket.on('set_user_id', (userID) => {
            users[userID] = socket;
        });

        socket.on('disconnect', () => {
            console.log('User disconnected with socketID', socket.id);
            Object.keys(users).forEach((key) => {
                if (users[key] === socket) {
                    delete users[key];
                }
            });
        });
    });

    return io;
}

function getUserSocket(userID) {
    return users[userID];
}

module.exports = { initialize, getUserSocket };
