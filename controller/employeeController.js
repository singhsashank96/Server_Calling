const Employee = require("../models/EmployeeModel");
const asyncHandler = require('express-async-handler');
const generateToken = require("../config/genreateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic , role} = req.body;

  if (!name || !email || !password || !role) {
    res.status(400).json({ status: 'error', message: "Please enter all the fields" });
    return;
  }

  const existUser = await Employee.findOne({ email });

  if (existUser) {
    res.status(400).json({ status: 'error', message: "User already registered" });
    return;
  }

  const user = await Employee.create({
    name,
    email,
    password,
    pic,
    role ,
  });

  if (user) {
    res.status(201).json({
      status: 'success',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        role:user.role,
        token: generateToken(user._id),
      }
    });
  } else {
    res.status(500).json({ status: 'error', message: "Could not register user" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Employee.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      status: 'success',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        role:user.role,
        token: generateToken(user._id),
      }
    });
  } else {
    res.status(401).json({ status: 'error', message: "Invalid email or password" });
  }
});

const AllUsers = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ status: 'error', message: "You are not authorized to access this resource" });
  }

  const { name } = req.query; // Extract search keyword from query parameters

  const keyword = name
    ? {
        $or: [
          { name: { $regex: `.*${name}.*`, $options: "i" } },
          { email: { $regex: `.*${name}.*`, $options: "i" } },
        ],
      }
    : {};

  const users = await Employee.find(keyword);
  res.json({ status: 'success', data: users });
});


module.exports = {
  registerUser,
  loginUser,
  AllUsers,
};
