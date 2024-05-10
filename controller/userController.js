const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


const addUser = asyncHandler(async (req, res) => {
    const { name, email, address, mobileNumber } = req.body;
  
    const existingUser = await User.findOne({ email });
  
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already registered with this email' });
    }
  
    const user = await User.create({ name, email, address, mobileNumber });
  
    res.status(201).json({ success: true, data: user });
  });
  


const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }

  await user.remove();

  res.status(200).json({ success: true, message: 'User deleted successfully' });
});


const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }

  res.status(200).json({ success: true, data: user });
});


const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json({ success: true, data: users });
});

module.exports = { addUser, deleteUser, getUserById, getAllUsers };
