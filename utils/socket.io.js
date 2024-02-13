const socketio = require('socket.io');
const Chat = require("../models/chatModel");
const Message = require('../models/messageModel');

module.exports = function(server) {
    const io = socketio(server);

    io.on('connection', (socket) => {
        console.log('connection established!');

        socket.on('privateMessage', async ({ recipientId, messageContent, senderId }) => {
            try {
                // Find or create chat room based on participants (sender and recipient)
                let chat = await Chat.findOne({
                    participants: { $all: [senderId, recipientId] }
                });

                if (!chat) {
                    chat = new Chat({
                        participants: [senderId, recipientId]
                    });
                    await chat.save();
                }

                // Save message to database
                const message = new Message({
                    chat: chat._id,
                    sender: senderId,
                    receiver: recipientId,
                    content: messageContent
                });
                await message.save();

                // Emit the message to the recipient
                io.to(recipientId).emit('privateMessage', {
                    senderId: senderId,
                    messageContent: messageContent
                });
            } catch (error) {
                console.error('Error sending private message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });
    });
};
