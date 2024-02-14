const { getUserSocket } = require('./connectionManager');

function sendPrivateMessage(senderID, recipientID, message) {
    const recipientSocket = getUserSocket(recipientID);
    if (recipientSocket) {
        recipientSocket.emit('private_message', { senderID, message });
    } else {
        console.log(`Recipient ${recipientID} is not connected.`);
    }
}

module.exports = { sendPrivateMessage };
