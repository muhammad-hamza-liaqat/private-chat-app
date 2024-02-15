// messageModel.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat", // Reference to the Chat model
    required: true,
  },
  sender: {
    type: String,
    ref: "User", // Reference to the User model
    required: true,
  },
  receiver: {
    type: String,
    ref: "User", // Reference to the User model
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;
