const socketIo = require('socket.io');

const users = {};
console.log('users', users)

function initialize(server) {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('A user connected with socketID', socket.id);
        users[socket.id] = socket;   
        console.log(users)       
        // socket.on('set_user_id', (userID) => {
        //     users[userID] = socket;
        //     console.log(`User ${userID} connected with socketID ${socket.id}`);
        // });

        socket.on('private_message', ({ senderID, recipientID, message }) => {
            console.log(`Private message from ${senderID} to ${recipientID}: ${message}`);
            sendPrivateMessage(senderID, recipientID, message);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected with socketID', socket.id);
            for (const key in users) {
                if (users[key] === socket) {
                    delete users[key];
                    console.log(`User with ID ${key} removed from users.`);
                    break; // Exit loop after deleting the user
                }
            }
        });
    });

    function getUserSocket(userID) {
        console.log('user', users)
        return users[userID];
    }

    function sendPrivateMessage(senderID, recipientID, message) {
        console.log(`Sending private message from ${senderID} to ${recipientID}: ${message}`);

        const senderSocket = getUserSocket(senderID);
        if (!senderSocket) {
            console.log(`Sender ${senderID} is not connected.`);
            return; // Exit the function if sender is not connected
        }

        const recipientSocket = getUserSocket(recipientID);
        if (recipientSocket) {
            console.log(`Recipient ${recipientID} is connected.`);
            recipientSocket.emit('private_message', { senderID, message });
            console.log(`Message "${message}" sent successfully to recipient ${recipientID}`);
        } else {
            console.log(`Recipient ${recipientID} is not connected.`);
        }
    }

    return { io, sendPrivateMessage };
}

module.exports = initialize;
