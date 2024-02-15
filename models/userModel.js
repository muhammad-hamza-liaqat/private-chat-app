const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: {
    type: String, 
    required: false
  },
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    // required: true,
    // unique: true
    required: false
  },
  password: {
    type: String,
    required: false
  },
  socketID: {
    type: String,
    required: false
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
