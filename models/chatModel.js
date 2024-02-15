const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: String,
      ref: "User", // Reference to the User model
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;
