const socketIo = require('socket.io');

const users = {};

function initialize(server) {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('A user connected with socketID', socket.id);

        socket.on('set_user_id', (userID) => {
            users[userID] = socket;
            console.log(`User ${userID} connected with socketID ${socket.id}`);
        });

        socket.on('private_message', ({ senderID, recipientID, message }) => {
            console.log(`Private message from ${senderID} to ${recipientID}: ${message}`);
            const recipientSocket = users[recipientID];
            if (recipientSocket) {
                recipientSocket.emit('private_message', { senderID, message });
                console.log(`Message "${message}" sent successfully to recipient ${recipientID}`);
            } else {
                console.log(`Recipient ${recipientID} is not connected.`);
            }
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

    function getUserSocket(userID) {
        return users[userID];
    }

    function sendPrivateMessage(senderID, recipientID, message) {
        console.log(`Private message from ${senderID} to ${recipientID}: ${message}`);

        const recipientSocket = getUserSocket(recipientID);
        if (recipientSocket) {
            recipientSocket.emit('private_message', { senderID, message });
            console.log(`Message "${message}" sent successfully to recipient ${recipientID}`);
        } else {
            console.log(`Recipient ${recipientID} is not connected.`);
        }
    }

    return { io, sendPrivateMessage };
}

module.exports = initialize;
