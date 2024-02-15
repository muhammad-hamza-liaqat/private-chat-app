const socketIo = require('socket.io');
const mongoose = require('mongoose');
const UserModel = require('../../models/userModel');
const ChatModel = require('../../models/chatModel');
const MessageModel = require('../../models/messageModel');

const users = {};

function initialize(server) {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('A user connected with socketID', socket.id);

        // Save the user's socket ID to the database
        const newUser = new UserModel({ _id: socket.id, socketID: socket.id });
        newUser.save()
            .then(user => {
                console.log('New user saved to the database:', user);
            })
            .catch(err => {
                console.error('Error saving new user to the database:', err);
            });

        users[socket.id] = socket;

        socket.on('private_message', async ({ senderID, recipientID, message }) => {
            console.log(`Private message from ${senderID} to ${recipientID}: ${message}`);
            try {
                await sendPrivateMessage(senderID, recipientID, message);
            } catch (error) {
                console.error('Error sending private message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected with socketID', socket.id);
            delete users[socket.id];
            console.log(`User with ID ${socket.id} removed from users.`);
        });
    });

    async function getUserSocket(userID) {
        return users[userID];
    }

    async function sendPrivateMessage(senderID, recipientID, message) {
        console.log(`Sending private message from ${senderID} to ${recipientID}: ${message}`);
    
        const senderSocket = await getUserSocket(senderID);
        if (!senderSocket) {
            console.log(`Sender ${senderID} is not connected.`);
            return;
        }
    
        const recipientSocket = await getUserSocket(recipientID);
        if (recipientSocket) {
            console.log(`Recipient ${recipientID} is connected.`);
            recipientSocket.emit('private_message', { senderID, message });
            console.log(`Message "${message}" sent successfully to recipient ${recipientID}`);
    
            // Find or create chat
            let chat = await ChatModel.findOne({
                participants: { $all: [senderID, recipientID] }
            });
    
            if (!chat) {
                chat = new ChatModel({ participants: [senderID, recipientID] });
                await chat.save();
            }
    
            // Save the message to the database
            const messageData = {
                chat: chat._id,
                sender: senderID,
                receiver: recipientID,
                content: message
            };
            const newMessage = new MessageModel(messageData);
            await newMessage.save();
            console.log('Message saved to the database:', newMessage);
        } else {
            console.log(`Recipient ${recipientID} is not connected.`);
        }
    }
    
    return { io, sendPrivateMessage };
}

module.exports = initialize;
