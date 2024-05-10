// models/UserModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: String,
  mobileNumber: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
